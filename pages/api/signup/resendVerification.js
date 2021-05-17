import wrapper from "../../../utils/wrapper";
import emailController from "../../../controllers/emailController";

/**
 * When user clicks "resend verification email"
 */

const handler = async (req, res, next) => {
    try {
        res.locals.email = req.body.email;
        res.locals.username = req.body.username;

        await next(emailController.sendVerificationEmail)
            .then((result) => {
                if (!result) return;
            })
            .catch((err) => {
                throw new Error(err);
            });

        res.sendCookies();
        return res.json({
            message: `Please verify the email sent to ${res.locals.email}.`,
        });
    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};

export default wrapper(handler);
