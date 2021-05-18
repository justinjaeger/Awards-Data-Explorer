import db from "../../lib/db";
import React from "react";
import axios from "axios";
import cookies from "next-cookies";

import parseCookies from "../../utils/parseCookies";
import Header from "../../containers/Header";
import RankGame from "../../containers/RankGame/Game";
import Four0Four from "../../containers/Four0Four";

/**
 * /rank/2022-AMPAS-picture
 */

export default function Rank(props) {
    return (
        <>
            <Header
                loggedIn={props.loggedIn}
                loginDropdown={props.loginDropdown}
                loginRoute={props.loginRoute}
                notification={props.notification}
                username={props.username}
                email={props.email}
                image={props.image}
                URL={props.URL}
            />

            {props.send404 ? (
                <Four0Four thingCannotFind={"Page"} />
            ) : (
                <RankGame
                    loggedIn={props.loggedIn}
                    userId={props.userId}
                    admin={props.admin}
                    year={props.year}
                    awardsShow={props.awardsShow}
                    category={props.category}
                    rank_category_id={props.rank_category_id}
                />
            )}
        </>
    );
}

/**
 * Fetch all SSR (user specific) props
 * Begin by declaring all props' default values
 * Depending on what cookies we have and the access token validation,
 * populate the app with specific data
 */

export async function getServerSideProps(context) {
    // Determine the url based on the environment
    const URL = (() => {
        switch (process.env.NODE_ENV) {
            case "development":
                return "http://localhost:3003";
            case "production":
                return "https://oscarexpert.com";
        }
    })();

    // Deconstruct the slug
    const slug = context.req.url;

    /* Default values for all props */
    const props = {
        loggedIn: false,
        loginDropdown: false,
        loginRoute: "/",
        notification: "",
        username: "",
        userId: null,
        admin: false,
        send404: false,
        URL,
        slug,
        year: "",
        awardsShow: "",
        category: "",
        rank_category_id: null,
    };

    /* Handle cookies */

    const c = cookies(context); // for getting cookies

    if (c.sent_verification) {
        // cookie exists after you sign up but NOT after you authenticate email
        const username = c.sent_verification.split("*$%&")[0];
        const email = c.sent_verification.split("*$%&")[1];
        props.email = email;
        props.username = username;
        props.notification = "please verify email";
    }

    if (c.authenticated) {
        // cookie exists after you authenticate email
        const username = c.authenticated;
        props.loginRoute = "/login";
        props.loginDropdown = true;
        props.username = username;
        props.notification = "Email verified. Please enter your password.";
    }

    if (c.reset_password) {
        // cookie exists after you reset password
        const email = c.reset_password;
        props.loginRoute = "/resetPassword";
        props.loginDropdown = true;
        props.email = email;
        props.notification = `Please enter a new password for ${email}.`;
    }

    /**
     * This is basically what logs you in.
     * If access token exists, verify it.
     * If verified, populate the page with appropriate user data
     */

    if (c.accessToken) {
        // cookie exists when you are logged in
        const payload = { accessToken: c.accessToken };
        /* Request to verify token and get data no the user */
        await axios
            .post(`${URL}/api/auth`, payload)
            .then((res) => {
                /* If token is verified, set props accordingly */
                if (res.data.loggedIn) {
                    props.loggedIn = true;
                    props.userId = res.data.userId;
                    props.username = res.data.username;
                    props.admin = res.data.admin;
                    if (res.data.image) props.image = res.data.image;
                }
                /* sets cookies on client (HAVE to do this inside getServerSideProps) */
                parseCookies(res.data.cookieArray, context);
            })
            .catch((err) => {
                console.log(
                    "something went wrong while verifying access token",
                    err
                );
            });
    }

    // Deconstruct the slug
    const slugArray = slug.split("-");
    props.year = slugArray[0].split("/").slice(-1)[0];
    props.awardsShow = slugArray[1];
    props.category = slugArray[2];

    // Validate the URL the user requested
    // by seeing if the category exists
    let result = await db.query(`
    SELECT rank_category_id 
    FROM rank_category
    WHERE year='${props.year}'
    AND category='${props.category}'
    AND awardsShow='${props.awardsShow}'
  `);
    if (result.error) {
        throw result.error;
    }
    if (!result.length) {
        // Means we don't have a category to match slug
        props.send404 = true;
    }

    props.rank_category_id = result[0].rank_category_id;

    /* Return the final props object */
    return { props };
}
