import wrapper from '../../../utils/wrapper';
import tokenController from '../../../controllers/tokenController';
import loginController from '../../../controllers/loginController';

/**
 * When the user clicks Log In
 */

const handler = async (req, res, next) => {

    res.locals.emailOrUsername = req.body.emailOrUsername;
    res.locals.password = req.body.password;
    res.locals.entryType = (res.locals.emailOrUsername.includes('@')) ? 'email' : 'username';
    /* ^^^ Determine entry type - email or username */

    console.log('locals',res.locals)

    await next
    (
      loginController.returnUserData,
      loginController.verifyPassword,
      loginController.verifyEmailAuthenticated,
      tokenController.createAccessToken
    )
    .then(result => { if (!result) return; })
    .catch(e => { res.status(500).send(e.message); })
    
    res.sendCookies();
    return res.json({
      loggedIn: true,
      username: res.locals.username
    });

};

export default wrapper(handler);
