import wrapper from '../../utils/wrapper';
import tokenController from '../../controllers/tokenController';
import userController from '../../controllers/userController';

/**
 * Verifies access token and returns user data for header
 */

const handler = async (req, res, next) => {
    try {
        /* Get accessToken from req.body */
        res.locals.accessToken = req.body.accessToken;

        await next(tokenController.verifyToken, userController.header)
            .then((result) => {
                if (!result) return;
            })
            .catch((err) => {
                throw new Error(err);
            });

        /* NOTE ON COOKIES: 
    We pass cookieArray to the output object so we can call 
    a special cookie command from getServerSideProps. 
    Any time we write cookies from the server side, we must do this.
    If we write cookies from the client-side, we can call the method below, 
    res.sendCookies, instead.
    I am still using it so it writes cookies in Postman.  */
        res.sendCookies();
        return res.json({
            loggedIn: true,
            userId: res.locals.userId,
            username: res.locals.username,
            image: res.locals.image,
            admin: res.locals.admin,
            cookieArray: res.cookieArray,
        });
    } catch (e) {
        console.log('error in /auth', e);
        return res.status(500).send(e.message);
    }
};

export default wrapper(handler);
