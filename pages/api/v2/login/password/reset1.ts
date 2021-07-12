import db from '../../../../../lib/db';
import { IGenericResponse } from '../../../../../types/responses';
import { createVerificationCodeEmail } from '../../../../../utils/mailHelper';

/**
 * Step 1 in reset password preocess
 * User submits email in 'forgot password' form, which sends an email
 * that leads to reset/[code].tsx
 */

 export default async (req, res): Promise<IGenericResponse> => {

    const {
        method,
        body: { email },
    } = req;

    try {
        if (method === 'POST') {
            // Check if email is valid input
            if (!email.includes('@') || !email.includes('.')) {
                return res.json({ 
                    status: 'rejected', 
                    message: 'this email is not properly formatted' 
                });
            }

            // Ensure email is registered already / get userId
            const validateEmailRes = await db.query(`
                SELECT userId 
                FROM users
                WHERE email='${email}' 
            `);
            if (validateEmailRes.error) throw new Error(validateEmailRes.error);
            if (!validateEmailRes[0]) {
                return res.json({
                    status: 'rejected',
                    message: 'This email is not registered',
                });
            }
            const { userId } = validateEmailRes[0];

            // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const { transport, passwordResetOptions } = createVerificationCodeEmail(email, verificationCode);

            // Actually sends the email
            const emailRes = transport.sendMail(passwordResetOptions);
            if (emailRes.error) throw new Error(emailRes.error);

            // Get expiration time (now + 30 minutes)
            const dt = new Date();
            dt.setMinutes( dt.getMinutes() + 30 );
            const expiration = dt.toISOString().slice(0, 19).replace("T", " ");

            // Sets verification code in database
            const verifCodeRes = await db.query(`
                INSERT INTO codes(code, userId, expiration)
                VALUES('${verificationCode}', ${userId}, '${expiration}')
            `)
            if (verifCodeRes.error) throw new Error(verifCodeRes.error);

            return res.send(200).json({ status: 'success' });
        }
    } catch (e) {
        console.log('error in reset.ts ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
