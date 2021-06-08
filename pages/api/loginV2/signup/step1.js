import db from '../../../../lib/db';
import { verificationEmail, verificationCode } from '../utils/mailHelper';

/**
 * User submits email and gets a confirmation link sent to them
 */

export default async (req, res) => {

    let result;

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
            result = await db.query(`
                INSERT INTO users(email)
                VALUES('${email}') 
            `);
            if (result.error) {
                // Handle duplicate entry errors with an error message
                if (result.error.code === 'ER_DUP_ENTRY') {
                    return res.json({
                        status: 'rejected',
                        message: 'This email is already registered.'
                    });
                }
                // If that's not the error, handle it like any other
                throw new Error(result.error);
            }

            // Get new user's userId
            result = await db.query(`
                SELECT userId FROM users
                WHERE email='${email}'
            `)
            if (result.error) throw new Error(result.error);
            const { userId } = result[0];

            // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            // Utilize the helper function to create e-mail
            const { transport, options } = verificationCode(email, verificationCode);

            // Actually sends the email
            result = transport.sendMail(options);
            if (result.error) throw new Error(result.error);

            // Get expiration time (now + 30 minutes)
            const dt = new Date();
            dt.setMinutes( dt.getMinutes() + 30 );
            const expiration = dt.toISOString().slice(0, 19).replace("T", " ");

            // Sets verification code in database
            result = await db.query(`
                INSERT INTO codes(verificationCode, userId, expiration)
                VALUES('${verificationCode}', ${userId}, '${expiration}')
            `)
            if (result.error) throw new Error(result.error);

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
