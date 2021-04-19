import wrapper from '../../../utils/wrapper';
import emailController from '../../../controllers/emailController';
import signupController from '../../../controllers/signupController';

/**
 * When the user clicks 'Sign Up'
 */

const handler = async (req, res, next) => {

  try {
    res.locals.email = req.body.email;
    res.locals.username = req.body.username;
    res.locals.password = req.body.password;
    res.locals.confirmPassword = req.body.confirmPassword;

    await next
    (
      signupController.validateEmailAndUsername,
      signupController.validatePassword,
      signupController.hashPassword,
      signupController.createUser,
      emailController.sendVerificationEmail,
      signupController.markDateCreated,
    )
    .then(result => { if (!result) return; })
    .catch(err => { throw new Error(err); })

    /* set a cookie called sent_verification with value email */
    res.cookie('sent_verification', `${res.locals.username}*$%&${res.locals.email}`);

    res.sendCookies();
    return res.json({ 
      message: `Please verify the email sent to ${res.locals.email}.` 
    });
  }
  catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };
};

export default wrapper(handler);
