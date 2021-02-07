import db from 'lib/db';
const profanityFilter = require('utils/profanityFilter');
const usernameFilter = require('utils/usernameFilter');
const bcrypt = require('bcrypt');

const signupController = {};
let result, query;

/*************************************/

/**
 * Checks that email and username are formatted properly
 * - determines whether username is valid (no profanity, etc)
 * - note: Imports helper functions from the 'misc' folder
 */

signupController.validateEmailAndUsername = (req, res, next) => {

  const { email, username } = res.locals;

  if (!email.includes('@') || !email.includes('.') ) {
    return res.json({ error : 'this email is not properly formatted' });
  };

  if (username.length > 20) {
    return res.json({ error : 'username cannot be more than 20 characters' });
  }

  const filterResult = usernameFilter(username);
  if (filterResult.status === false) {
    return res.json({ error : filterResult.message });
  };

  if (profanityFilter(username) === true) {
    return res.json({ error : 'Profanity is not allowed in your username' });
  };

  return next();
};

/*************************************/

signupController.validatePassword = (req, res, next) => {
  
  const { password, confirmPassword } = res.locals;

  /* check if passwords match */
  if (password !== confirmPassword) {
    return res.json({ error : 'passwords do not match' });
  };

  /* check that password is proper length */
  if (password.length < 8) {
    return res.json({ error : 'password must be more than 8 characters' });
  };

  if (password.length > 20) {
    return res.json({ error : 'password must be less than 20 characters' });
  };

  return next();
};

/*************************************/

signupController.hashPassword = async (req, res, next) => {

  const { password } = res.locals;

  /* hash the password using bcrypt */
  result = await bcrypt.hash(password, 8); 
  res.handleErrors(result);

  /* store the hashed password */
  res.locals.hashedPassword = result;

  return next();
};

/*************************************/

signupController.createUser = async (req, res, next) => {

  const { email, username, password: hashedPassword } = res.locals;

  /* Create new user in database */
  query = `
    INSERT INTO users(email, username, password)
    VALUES("${email}", "${username}", "${password}") `;
  result = await db.query(query); 
  if (result.error) {
    /* Handle duplicate entry errors with an error message */
    if (result.error.code === 'ER_DUP_ENTRY') {
      return (result.error.sqlMessage.split('.')[1] === `username'`)
        ? res.json({ error: 'This username is already registered.' })
        : res.json({ error: 'This email is already registered.' })
    };
    /* If that's not the error, handle it like any other */
    res.handleErrors(result);
  };
  res.handleEmptyResult(result);

  return next();
};

/*************************************/

signupController.authenticateUser = async (req, res, next) => {

  const { username } = res.locals;

  /* Set authentication status to true (0 -> 1) */
  query = `
    UPDATE users
    SET authenticated=1
    WHERE username="${username}" `;
  result = await db.query(query); 
  res.handleErrors(result);
  res.handleEmptyResult(result);

  return next();
};

/*************************************/

signupController.getUserIdByUsername = async (req, res, next) => {

  const { username } = res.locals;

  /* get the user_id from the username */
  query = `
    SELECT user_id
    FROM users
    WHERE username="${username}" `;
  result = await db.query(query); 
  res.handleErrors(result);
  res.handleEmptyResult(result);

  res.locals.user_id = result[0];
  
  return next();
};

/*************************************/

signupController.markDateCreated = async (req, res, next) => {

  const { username } = res.locals;

  /* get the datetime */
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  /* update the "dateCreated" field with current datetime */
  query = `
    UPDATE users
    SET dateCreated = '${datetime}'
    WHERE username = '${username}' `;
  result = await db.query(query); 
  res.handleErrors(result);
  res.handleEmptyResult(result);

  return next();
};

/*************************************/

signupController.deleteUser = async (req, res, next) => {

  const { email } = res.locals;

  /* delete the user from database */
  query = `
    DELETE FROM users
    WHERE email = '${email}' `;
  result = await db.query(query); 
  res.handleErrors(result);
  res.handleEmptyResult(result, { error: 'did not delete user'});

  return next();
};

/*************************************/

module.exports = signupController;