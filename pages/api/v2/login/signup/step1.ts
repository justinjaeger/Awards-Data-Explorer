import db from '../../../../../lib/db';
import { verificationEmail, createVerificationCodeEmail } from '../../../../../utils/mailHelper';
import { ISignupStepOneResponse } from '../../../../../types/responses';

/**
 * User submits email and gets a confirmation link sent to them
 * Also returns userId?
 */

export default async (req, res): Promise<ISignupStepOneResponse> => {

    const {
        method,
        body: { email },
    } = req;
    
    try {
        // POST: signup / create new user
        if (method === 'POST') {

            // Check that email is properly formatted
            if (!email.includes('@') || !email.includes('.')) {
                return res.json({
                    status: 'rejected',
                    message: 'This email is not properly formatted.'
                });
            }

            // Create new user in database
            const newUserRes = await db.query(`
                INSERT INTO users(email)
                VALUES('${email}') 
            `);
            if (newUserRes.error) {
                // Handle duplicate entry errors with an error message
                if (newUserRes.error.code === 'ER_DUP_ENTRY') {
                    return res.json({
                        status: 'rejected',
                        message: 'This email is already registered.'
                    });
                }
                // If that's not the error, handle it like any other
                throw new Error(newUserRes.error);
            }

            // Get new user's userId
            const newUserId = await db.query(`
                SELECT userId FROM users
                WHERE email='${email}'
            `)
            if (newUserId.error) throw new Error(newUserId.error);
            const { userId } = newUserId[0];

            // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            // Utilize the helper function to create e-mail
            // Creates the link to send them to signup/:code
            const { transport, options } = createVerificationCodeEmail(email, verificationCode);

            // Actually sends the email
            const emailRes = transport.sendMail(options);
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

            // Send a 200 status back, where it will display a confirmation message to check email
            return res.status(200).json({ status: 'success' });
        };

    } catch(e) {
        console.log('error in step1: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
