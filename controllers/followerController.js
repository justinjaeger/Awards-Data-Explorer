import db from "../lib/db";

const followerController = {};
let result;

/*************************************/

followerController.getFollowers = async (req, res) => {
    console.log("getFollowers");

    const { profileUsername } = res.locals;
    console.log("1");

    /* Fetch the user's followers - names and images */
    result = await db.query(`
    SELECT username, image 
    FROM users
    WHERE username IN (
      SELECT follower FROM followers
      WHERE username='${profileUsername}' 
    );
  `);
    res.handleErrors(result);
    console.log("2");

    const followers = result.map((user) => {
        const image = user.image ? user.image : "/PROFILE.png";
        return {
            username: user.username,
            image: image,
        };
    });

    res.locals.followers = followers;
};

/*************************************/

followerController.getFollowing = async (req, res) => {
    console.log("getFollowing");

    const { follower } = res.locals;

    /* Fetch who user is following - user is the follower */
    result = await db.query(`
    SELECT username, image 
    FROM users
    WHERE username IN (
      SELECT username FROM followers
      WHERE follower='${follower}'
    );
  `);
    res.handleErrors(result);

    const following = result.map((user) => {
        const image = user.image ? user.image : "/PROFILE.png";
        return {
            username: user.username,
            image: image,
        };
    });

    res.locals.following = following;
};

/*************************************/

followerController.followUser = async (req, res) => {
    console.log("followUser");

    const { follower, profileUsername } = res.locals;

    /* Get the current datetime */
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

    /* Follow user */
    result = await db.query(`
    INSERT INTO followers(username, follower, dateCreated)
    VALUES('${profileUsername}', '${follower}', '${datetime}')
  `);
    res.handleErrors(result);
};

/*************************************/

followerController.unfollowUser = async (req, res) => {
    console.log("unfollowUser");

    const { follower, profileUsername } = res.locals;

    /* Unfollow user */
    result = await db.query(`
    DELETE FROM followers 
    WHERE username='${profileUsername}' AND follower='${follower}'
  `);
    res.handleErrors(result);
};

/*************************************/

followerController.getNumFollowers = async (req, res) => {
    console.log("getNumFollowers");

    const { username } = res.locals;

    /* Fetch num of followers - cur page is followee */
    result = await db.query(`
    SELECT COUNT(*) AS sum FROM followers WHERE username='${username}'
  `);
    res.handleErrors(result);

    res.locals.numFollowers = result[0].sum;
};

/*************************************/

followerController.getNumFollowing = async (req, res) => {
    console.log("getNumFollowing");

    const { username } = res.locals;

    /* Fetch who user is following - user is the follower */
    result = await db.query(`
    SELECT COUNT(*) AS sum FROM followers WHERE follower='${username}'
  `);
    res.handleErrors(result);

    res.locals.numFollowing = result[0].sum;
};

/*************************************/

followerController.determineFollowing = async (req, res) => {
    console.log("determineFollowing");

    const { username, profileUsername } = res.locals;

    /* Fetch who user is following - user is the follower */
    result = await db.query(`
    SELECT * FROM followers
    WHERE username='${profileUsername}'
    AND follower='${username}'
  `);
    res.handleErrors(result);

    res.locals.followingUser = result.length ? true : false;
};

/*************************************/

export default followerController;
