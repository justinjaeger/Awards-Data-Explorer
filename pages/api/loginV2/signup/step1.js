import db from "../../../../lib/db";
import { verificationEmail, verificationCode } from "../utils/mailHelper";

/**
 * User submits email and gets a confirmation link sent to them
 */

export default async (req, res) => {

    let result;

    const {
        method,
        body: { userId, email },
    } = req;
    
    try {
        // POST: signup / create new user
        if (method === 'POST') {

            // Check that email is properly formatted
            if (!email.includes("@") || !email.includes(".")) {
                return res.json({ error: "This email is not properly formatted." });
            }

            // Create new user in database
            result = await db.query(`
                INSERT INTO users(email)
                VALUES('${email}') 
            `);
            if (result.error) {
                // Handle duplicate entry errors with an error message
                if (result.error.code === "ER_DUP_ENTRY") {
                    return res.json({ error: "This email is already registered." });
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

            // Utilizes the helper function to create e-mail
            const { transport, options } = verificationCode(email, verificationCode);

            // Actually sends the email
            result = transport.sendMail(options);
            if (result.error) throw new Error(result.error);

            // Send a 200 status back, where it will display a confirmation message to check email
            return res.status(200).json({ userId });
        };

         // POST: signup / delete user by userId
         if (method === 'POST') {
            // Delete user from database
            result = await db.query(`
                DELETE FROM users
                WHERE userId='${userId}'
            `);
            if (result.error) throw new Error(result.error);
            // Delete user code
            result = await db.query(`
                DELETE FROM users
                WHERE userId='${userId}'
            `);
            if (result.error) throw new Error(result.error);

            return res.status(200);
         }

    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
