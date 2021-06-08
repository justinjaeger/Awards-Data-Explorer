import wrapper from '../../../utils/wrapper';
import tokenController from '../../../controllers/tokenController';
import loginController from '../../../controllers/loginController';
import signupController from '../../../controllers/signupController';

/**
 * When the user clicks Reset Password
 */

const handler = async (req, res, next) => {
    try {
        res.locals.password = req.body.password;
        res.locals.confirmPassword = req.body.confirmPassword;
        res.locals.emailOrUsername = req.body.email;
        res.locals.entryType = 'email';

        await next(
            loginController.returnUserData,
            signupController.validatePassword,
            signupController.hashPassword,
            loginController.updatePassword,
            tokenController.createAccessToken
        )
            .then((result) => {
                if (!result) return;
            })
            .catch((err) => {
                throw new Error(err);
            });

        res.sendCookies();
        return res.json({
            loggedIn: true,
            username: res.locals.username,
        });
    } catch (e) {
        console.log('error ', e);
        return res.status(500).send(e.message);
    }
};

export default wrapper(handler);
