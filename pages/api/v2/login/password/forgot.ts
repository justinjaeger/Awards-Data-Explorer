import wrapper from '../../../utils/wrapper';
import emailController from '../../../controllers/emailController';
import loginController from '../../../controllers/loginController';

/**
 * When the user submits 'forgot password', which sends an email
 */

const handler = async (req, res, next) => {
    try {
        const { email } = req.body;
        res.locals.email = email;

        /* Check if email is valid */
        if (!email.includes('@') || !email.includes('.')) {
            return res.json({ error: 'this email is not properly formatted' });
        }

        await next(
            loginController.ifEmailNoExistDontSend,
            emailController.sendResetPasswordEmail
        )
            .then((result) => {
                if (!result) return;
            })
            .catch((err) => {
                throw new Error(err);
            });

        res.sendCookies();
        return res.json({
            message: `An email was sent to ${email}.`,
            route: '/blank',
        });
    } catch (e) {
        console.log('error ', e);
        return res.status(500).send(e.message);
    }
};

export default wrapper(handler);
