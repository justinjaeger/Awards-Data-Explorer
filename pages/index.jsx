import React from "react";
// import axios from "axios";
import db from "../lib/db";
import cookies from "next-cookies";
import { useCookie } from "next-cookie";
import Header from "../containers/Header";
// import parseCookies from "../utils/parseCookies";
import RankCategories from "../containers/RankGame/Categories";
// import tokenController from "../controllers/tokenController";
import verifyToken from '../controllers/verifyToken';

export default function Home(props) {
    return (
        <>
            <Header
                loggedIn={props.loggedIn}
                loginDropdown={props.loginDropdown}
                loginRoute={props.loginRoute}
                username={props.username}
                email={props.email}
                notification={props.notification}
                image={props.image}
                URL={props.URL}
            />
            <RankCategories URL={props.URL} />
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

    /* Default values for all props */

    const props = {
        loggedIn: false,
        loginDropdown: false,
        loginRoute: "/",
        notification: "",
        username: "",
        email: "",
        notification: false,
        image: "/PROFILE.png",
        URL: URL,
    };

    /* Handle cookies */

    const c = cookies(context); // for getting cookies
    const cookie = useCookie(context); // for setting cookies

    // if (c.sent_verification) {
    //     // cookie exists after you sign up but NOT after you authenticate email
    //     const username = c.sent_verification.split("*$%&")[0];
    //     const email = c.sent_verification.split("*$%&")[1];
    //     props.email = email;
    //     props.username = username;
    //     props.notification = "please verify email";
    // }

    // if (c.authenticated) {
    //     // cookie exists after you authenticate email
    //     const username = c.authenticated;
    //     props.loginRoute = "/login";
    //     props.loginDropdown = true;
    //     props.username = username;
    //     props.notification = "Email verified. Please enter your password.";
    // }

    // if (c.reset_password) {
    //     // cookie exists after you reset password
    //     const email = c.reset_password;
    //     props.loginRoute = "/resetPassword";
    //     props.loginDropdown = true;
    //     props.email = email;
    //     props.notification = `Please enter a new password for ${email}.`;
    // }

    /**
     * This is basically what logs you in.
     * If access token exists, verify it.
     * If verified, populate the page with appropriate user data
     */
    if (c.accessToken) {
        console.log('access token found')
        // cookie exists when you are logged in
        /**
         * Request to verify token
         * We're going to load all the auth info on the server - the profile information.
         * Everything else we can render on the client.
         */
        try {
            let result;
            result = await verifyToken(c.accessToken);
            const { userId, tokenAction, accessToken } = result.data;
            if (tokenAction === 'delete') {
                cookie.set('accessToken');
                return;
            }
            props.loggedIn = true;
            if (tokenAction === 'update') {
                cookie.set('accessToken', accessToken);
            }
            // Get logged in user's info
            result = await db.query(`
                SELECT username, image, admin
                FROM users 
                WHERE userId=${userId} 
            `);
            if (result.error) throw new Error(result.error);
            console.log('result getting user info', result[0])
            // set the user's information in props
            const { username, image } = result[0];
            props.username = username;
            if (image) props.image = image;
        } catch(e) {
            console.log("error in index.jsx: ", e.message);
        }
    }

    /* Return the final props object */
    return { props };
}
