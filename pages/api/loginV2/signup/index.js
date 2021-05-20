import db from "../../../../lib/db";
import bcrypt from "bcrypt";
import profanityFilter from "../../utils/profanityFilter";
import usernameFilter from "../../utils/usernameFilter";
import { encrypt } from "../utils/encrypt";
import mailHelper from "../utils/mailHelper";

export default async (req, res) => {

    let result;

    const {
        method,
        body: { email, username, password, confirmPassword },
    } = req;
    
    try {
        // POST: signup / create new user
        if (method === 'POST') {
            // Check that email is properly formatted
            if (!email.includes("@") || !email.includes(".")) {
                return res.json({ error: "This email is not properly formatted." });
            }
            // Check that username is properly formatted
            const filterResult = usernameFilter(username);
            if (filterResult.status === false) {
                return res.json({ error: filterResult.message });
            }
            // Check that no profanity
            if (profanityFilter(username) === true) {
                return res.json({ error: "Profanity is not allowed in your username" });
            }
            // Check that passwords match
            if (password !== confirmPassword) {
                return res.json({ error: "Passwords do not match." });
            }

            // Check that password is proper length
            if (password.length < 8) {
                return res.json({ error: "Password must be more than 8 characters." });
            }
            if (password.length > 20) {
                return res.json({ error: "Password must be less than 20 characters." });
            }

            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 8);
            if (hashedPassword.error) throw new Error(hashedPassword.error);

            // Get the datetime
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

            // Create new user in database
            result = await db.query(`
                INSERT INTO users(email, username, password, dateCreated)
                VALUES('${email}', '${username}', '${hashedPassword}', '${datetime}') 
            `);
            if (result.error) {
                // Handle duplicate entry errors with an error message
                if (result.error.code === "ER_DUP_ENTRY") {
                    return result.error.sqlMessage.split(".")[1] === `username'`
                        ? res.json({ error: "This username is already registered." })
                        : res.json({ error: "This email is already registered." });
                }
                // If that's not the error, handle it like any other
                throw new Error(result.error);
            }

            // SEND VERIFICATION CODE: (right now it's just email)
                // we will simply take them to an enter verification code URL
                // entering the code properly will set authenticated to 1
            // Create the URL that takes the user to reset password page
            const encryptedUsername = encrypt(username); // encrypts username so we can safetly use it in url
            const encodedUsername = encodeURIComponent(encryptedUsername); // encodes it because encryption will put weird characters in that will otherwise mess up the route
            const url = `${BASEURL}/api/signup/verifyEmail/?username=${encodedUsername}`;

            // Utilizes the helper function to create e-mail
            const { transport, emailVerificationOptions } = mailHelper(
                email,
                url,
                username
            );

            // Actually sends the email
            result = transport.sendMail(emailVerificationOptions);
            if (result.error) throw new Error(result.error);

            return res.status(200);
        };

    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
