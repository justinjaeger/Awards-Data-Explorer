import React from "react";
import db from "../lib/db";
import cookies from "next-cookies";
import { useCookie } from "next-cookie";
import Header from "../containers/Header";
import RankCategories from "../containers/RankGame/Categories";
import verifyToken from '../controllers/verifyToken';
import { IUser } from '../types';

type IHomeProps = {
    URL: string,
    user: IUser,
}

export default function Home(props: IHomeProps) {

    const { URL, user } = props;

    console.log(URL, user)

    return (
        <>
            <Header
                URL={URL}
                user={user}
            />
            <RankCategories URL={URL} />
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
    const URL = (process.env.NODE_ENV === "development") ? "http://localhost:3003" : "https://oscarexpert.com";

    const emptyProps: IHomeProps = {
        URL,
        user: null,
    };

    const c = cookies(context); // for getting cookies
    const cookie = useCookie(context); // for setting cookies

    /**
     * This is basically what logs you in.
     * If access token exists, verify it.
     * If verified, populate the page with appropriate user data
     */
    if (c.accessToken) {
        console.log('access token found')
        /**
         * Request to verify token
         * May respond with action to delete or update token: handle that
         * We're going to load all the auth info on the server - the profile information.
         * Everything else we can render on the client.
         */
        try {
            let result;
            result = await verifyToken(c.accessToken);
            const { status, userId, accessToken } = result.data;
            if (status === 'delete') {
                cookie.set('accessToken', undefined); // should delete token
                return { props: emptyProps };
            }
            if (status === 'update') {
                cookie.set('accessToken', accessToken);
            }
            // Get verified user's info
            result = await db.query(`
                SELECT username, email, image, admin
                FROM users 
                WHERE userId=${userId} 
            `);
            if (result.error) throw new Error(result.error);
            console.log('result getting user info', result[0]); // so we can see result
            const { username, email, image, admin } = result[0];
            // Return the final props object */
            return { 
                props: {
                    URL,
                    user: {
                        userId,
                        username,
                        email,
                        image: image ? image : '/PROFILE.png',
                        admin,
                    },
                }
            }
        } catch(e) {
            console.log("error in index.jsx: ", e.message);
        }
    }

    console.log('empty', emptyProps)
    // If no accessToken, return empty props
    return { props: emptyProps };
}
