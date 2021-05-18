import wrapper from "../../../utils/wrapper";
import userController from "../../../controllers/userController";
import followerController from "../../../controllers/followerController";

/**
 * user
 *
 * Essentially gets called whenever we are trying to get a user's information
 * on a specific page.
 * We know that we have the username in the payload.
 */

const handler = async (req, res, next) => {
    try {
        /* Get the action from the url string */
        const action = req.query.slug[0];

        /* Get the profile username from the req body */
        res.locals.profileUsername = req.body.profileUsername;
        res.locals.username = res.locals.profileUsername;

        /* Check that a user with this name exists...
      if not, throw a 404 page */
        await userController.checkUserExists(req, res);
        if (res.finished) return;
        if (res.locals.send404) return res.json({ send404: true });

        /* This is the object we return at the end */
        const data = {};

        /* All the below functions modify the data object */
        switch (action) {
            case "dashboard":
                await next(
                    userController.getProfileImage,
                    followerController.getNumFollowers,
                    followerController.getNumFollowing
                )
                    .then((result) => {
                        if (!result) return;
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });

                /* Put all fetched data in data object */
                data.profileImage = res.locals.profileImage;
                data.numFollowers = res.locals.numFollowers;
                data.numFollowing = res.locals.numFollowing;
                break;
        }

        return res.json(data);
    } catch (e) {
        console.log("error in /user/...slug", e);
        return res.status(500).send(e.message);
    }
};

export default wrapper(handler);
