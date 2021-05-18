import db from "../lib/db";
const bcrypt = require("bcrypt");

const loginController = {};
let result;

/*************************************/

loginController.verifyPassword = async (req, res) => {
    console.log("verifyPassword");

    const { password, dbPassword } = res.locals;

    /* Verify password with bcrypt */
    result = await bcrypt.compare(password, dbPassword);
    /* If it returns false, set error on client */
    if (result === false) {
        return res.json({ error: `Credentials do not match` });
    }
};

/*************************************/

loginController.returnUserData = async (req, res) => {
    console.log("returnUserData");

    const { entryType, emailOrUsername } = res.locals;

    /* Fetch email or username based on entry */
    result = await db.query(`
    SELECT *
    FROM users
    WHERE ${entryType}='${emailOrUsername}'
  `);
    res.handleErrors(result);

    if (result[0] === undefined) {
        return res.json({ error: `Credentials do not match` });
    }

    /* Deconstruct all the data we just got */
    const { username, email, userId, password: dbPassword } = result[0];
    const authenticated = result[0].authenticated[0];

    res.locals.username = username;
    res.locals.email = email;
    res.locals.userId = userId;
    res.locals.dbPassword = dbPassword;
    res.locals.authenticated = authenticated;

    return {};
};

/*************************************/

/**
 * Attempts to get the userId
 * - if it returns nothing, it doesn't exist
 *   - because we dont want someone to be able to figure out whose email is valid and whose isn't, we send back a message saying we sent the email even if we didn't
 * - if it returns a userId, we proceed to next middleware
 */

loginController.ifEmailNoExistDontSend = async (req, res) => {
    console.log("ifEmailNoExistDontSend");

    const { email } = res.locals;

    /* Fetch userId. If no result, user doesn't exist */
    result = await db.query(`
    SELECT userId 
    FROM users
    WHERE email='${email}' 
  `);
    res.handleErrors(result);
    /* If user no exist, We should send the message anyway 
  in case a hacker is fishing for valid emails */
    if (result[0] === undefined) {
        res.json({
            message: `An email was sent to ${res.locals.email}.`,
            route: "/blank",
        });
    }
};

/*************************************/

loginController.updatePassword = async (req, res) => {
    console.log("updatePassword");

    const { hashedPassword, userId } = res.locals;

    /* Update the password in db */
    result = await db.query(`
    UPDATE users
    SET password='${hashedPassword}'
    WHERE userId=${userId} 
  `);
    res.handleErrors(result);
    // res.handleEmptyResult(result);
};

/*************************************/

loginController.verifyEmailAuthenticated = (req, res) => {
    console.log("verifyEmailAuthenticated");

    const { authenticated } = res.locals;

    if (authenticated === 0) {
        console.log("not authenticated");
        return res.json({
            message: `Please verify the email sent to ${res.locals.email}.`,
            email: res.locals.email,
            username: res.locals.username,
        });
    }
};

/*************************************/

export default loginController;
