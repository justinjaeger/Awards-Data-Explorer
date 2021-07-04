import React, { useState } from "react";
// import axios from "axios";
import db from "../../lib/db";
import cookies from "next-cookies";
import { useCookie } from "next-cookie";
import Header from "../../containers/Header";
// import parseCookies from "../utils/parseCookies";
import RankCategories from "../../containers/RankGame/Categories";
// import tokenController from "../controllers/tokenController";
import verifyToken from '../../controllers/verifyToken';
import axios from "axios";

export default function Home(props) {

    const [modal, setModal] = useState(userId ? true : false);
    const [resend, setResent] = useState(true);

    return (
        <>
            <Header
                userId={props.userId}
                form={props.form}
                username={props.username}
                email={props.email}
                notification={props.notification}
                image={props.image}
                URL={props.URL}
            />

            {/* Render some sort of home page */}
        </>
    );
}

/**
 * Checks the access code (a link from an email)
 * This will give you a prompt to create your account if code is correct
 */

export async function getServerSideProps(context) {

    // Get the profile username from the slug
    const code = context.req.url.slice(6);

    // Determine the url based on the environment
    const URL = (process.env.NODE_ENV === "development") ? "http://localhost:3003" : "https://oscarexpert.com";
    const emptyProps = {
        URL,
        userId: undefined,
        username: undefined,
        email: undefined,
        image: undefined,
        admin: false,
        form: undefined,
        notification: 'Access code expired',
        status: 'expired',
    };

    // Verify the code
    try {
        let result;
        // Get the code expiration
        result = await db.query(`
            SELECT userId, expiration
            FROM codes
            WHERE code=${code}
        `)
        // If result is empty code does not exist in db
        if (!result.length) return { ...emptyProps };
        if (result.error) throw new Error(result.error);
        const { expiration } = result[0];

        // Check if token expired
        const currentTime = Math.ceil(Date.now() / 1000);
        // If so,
        if (currentTime - expiration > 0) {
            // Delete token from database
            result = await db.query(`
                DELETE FROM codes
                WHERE code=${code}
            `)
            if (result.error) throw new Error(result.error);
            return { ...emptyProps };
        };
        // If not expired, get user email
        result = await db.query(`
            SELECT email FROM users
            WHERE userId=${userId}
        `)
        if (result.error) throw new Error(result.error);
        const { email } = result[0];
        
        // and send user to signup screen
        return { 
            ...emptyProps, 
            form: 'signup',
            notification: undefined,
            userId,
            email,
        };
    } catch(e) {
        console.log("error in index.jsx: ", e.message);
    }

}
