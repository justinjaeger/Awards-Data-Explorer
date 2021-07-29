import db from "../lib/db";
const jwt = require("jsonwebtoken");

const tokenController = {};
let result;
const tokenExpireTime = "10m";

/*************************************/

tokenController.verifyToken = async (req, res) => {
    console.log("inside verifyToken");

    const { accessToken } = res.locals;

    /* Get the expiration and userId from the token */
    result = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
        ignoreExpiration: true,
    });
    res.handleErrors(result);
    const { userId, exp: expiration } = result;
    res.locals.userId = userId;

    /* get the current time */
    const currentTime = Math.ceil(Date.now() / 1000);

    /* if token is expired... */
    if (currentTime - expiration > 0) {
        console.log("TOKEN EXPIRED");

        /* DELETE ACCESS TOKEN FROM DB */
        await tokenController.deleteAccessToken(req, res);
        if (res.finished) return;

        console.log("refreshing token... ");

        /* and CREATE NEW ACCESS TOKEN */
        await tokenController.createAccessToken(req, res);
        if (res.finished) return;
    }
};

/*************************************/

tokenController.createAccessToken = async (req, res) => {
    console.log("inside createAccessToken");

    const { userId } = res.locals;

    /* Delete cookies in browser if exist */
    res.cookie("authenticated");
    res.cookie("reset_password");

    /* CREATE ACCESS TOKEN */
    const accessPayload = { userId };
    const accessOptions = {
        expiresIn: tokenExpireTime,
    }; /* change the expiration here */
    const accessToken = jwt.sign(
        accessPayload,
        process.env.ACCESS_TOKEN_SECRET,
        accessOptions
    );

    /* SAVE TOKEN IN DB */
    result = await db.query(`
    INSERT INTO tokens(accessToken, userId)
    VALUES('${accessToken}', ${userId}) 
  `);
    res.handleErrors(result);
    // res.handleEmptyResult(result);

    console.log("1");

    /* UPDATE LAST LOGGED IN */
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    result = await db.query(`
    UPDATE users
    SET lastLoggedIn = '${datetime}'
    WHERE userId = ${userId} 
  `);
    res.handleErrors(result);
    // res.handleEmptyResult(result);

    console.log("2");

    /* Set new cookie in browser */
    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.locals.accessToken = accessToken;
};

/*************************************/

tokenController.deleteAccessToken = async (req, res) => {
    console.log("inside deleteAccessToken");

    const { accessToken, userId } = res.locals;

    /* Delete the access token in db */
    result = await db.query(`
    DELETE FROM tokens
    WHERE accessToken='${accessToken}' 
  `);
    res.handleErrors(result);

    console.log("token deleted from db");

    /* if it affected no rows, that means a hacker already used the access token. 
  Therefore, we delete all user tokens and end middleware chain. */
    if (result.affectedRows === 0) {
        console.log("deleting all user tokens");
        /* Delete all tokens associated with user */
        result = await db.query(`
      DELETE FROM tokens
      WHERE userId=${userId}`);
        res.handleErrors(result);

        /* Delete cookie from browser */
        res.cookie("accessToken");

        /* Return to stop everything */
        res.sendCookies(); // just for postman but otherwise ineffective
        return res.json({ cookieArray: res.cookieArray });
    }
};

/*************************************/

tokenController.getTokenData = async (req, res) => {
    console.log("inside getTokenData");

    const { accessToken } = res.locals;

    /* Get the userId from the JWT */
    result = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
        ignoreExpiration: true,
    });
    res.handleErrors(result);
    res.locals.userId = result.userId;
};

/*************************************/

export default tokenController;
