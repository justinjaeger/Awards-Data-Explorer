const nodemailer = require('nodemailer');

/**
 * Exports an object with all the mail configurations we need
 */

const verificationEmail = (email, url, username) => {
  
  const obj = {};

  if (process.env.NODE_ENV === 'development') {
    obj.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASSWORD
      }
    });
  };
  if (process.env.NODE_ENV === 'production') {
    obj.transport = nodemailer.createTransport({
      // NOTE: This def does noot work so
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true,
      auth: {
        type: 'custom',
        method: 'MY-CUSTOM-METHOD', // forces Nodemailer to use your custom handler
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
  };

  obj.emailVerificationOptions = {
    from: '"OscarExpert" <noreply@oscarexpert.com>',
    to: `${email}`,
    subject: 'Verify your email',
    text: `Hi, ${username}. Please click the link to verify your email`, 
    html: `
      <b>Hey there! </b>
      <div>Click this link to verify your email</div>
      <button><a href="${url}">Verify Email</a></button>
    `,
  };

  obj.passwordResetOptions = {
    from: '"OscarExpert" <noreply@oscarexpert.com>',
    to: `${email}`,
    subject: 'Reset your password',
    text: `Please click the link to reset your password`, 
    html: `
      <div>Click this link to reset your password</div>
      <button><a href="${url}">Reset Password</a></button>
    `,
  };

  return obj;
};

module.exports = verificationEmail;