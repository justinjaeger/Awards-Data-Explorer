import db from "../lib/db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let r;
const testController = {};

/**
 * Create and return a hashed password
 * @param {string} password
 * @returns {string} hashed password
 */
testController.hashPassword = async (password) => {
    r = await bcrypt.hash(password, 8);
    if (r.error) console.log(r.error);
    let hashedPass = r;
    return hashedPass;
};

/**
 * Create a new user
 * @param {string} email
 * @param {string} username
 * @param {string} password
 */
testController.createUser = async (email, username, hashedPass) => {
    r = await db.query(`
  INSERT INTO users(email, username, password)
  VALUES('${email}', '${username}', '${hashedPass}')
  `);
    if (r.error) console.log(r.error);
};

/**
 * Retrieves and returns userId
 * @param {string} username
 * @returns {integer} userId
 */
testController.getUserId = async (username) => {
    r = await db.query(`
    SELECT userId FROM users WHERE username='${username}'
  `);
    if (r.error) console.log(r.error);
    const userId = r[0].userId;
    return userId;
};

/**
 * Creates, stores, and returns accessToken
 * @param {string} username
 * @returns {string} accessToken
 */
testController.getAccessToken = async (userId, username) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
    r = await db.query(`
    INSERT INTO tokens(accessToken, userId, username)
    VALUES('${accessToken}', ${userId}, '${username}')
  `);
    if (r.error) console.log(r.error);
    return accessToken;
};

/**************************/
module.exports = testController;
