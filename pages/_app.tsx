import '../styles/index.scss';
import React from 'react';
import App from 'next/app'
import db from '../lib/db';
import cookies from 'next-cookies';
import { useCookie } from 'next-cookie';
import verifyToken, { IVerifyTokenResponse } from '../utils/verifyToken';
import Header from '../containers/Header';
import { IInitialProps } from '../types';
import Context from '../context';
import Notification from '../components/Notification';

/**
 * Component is the your page eg /index
 * pageProps injects any props from getServerSideProps in that component file
 * initialProps injects props from getInitialProps
 */

function MyApp({ Component, pageProps, initialProps }) {
    return (<>
        <Context.App.Provider value={initialProps.app}>
            <Context.Auth.Provider value={initialProps.user}>
                <Notification />
                <Header />
                <Component {...pageProps} {...initialProps} />
            </Context.Auth.Provider>
        </Context.App.Provider>
    </>);
}

/**
 * Authenticates user
 * If accessToken exists, verify it
 * If verified, populate page with user data
 */

MyApp.getInitialProps = async (context) => {
    const appProps = await App.getInitialProps(context);

    const url = (process.env.NODE_ENV === "development") 
        ? "http://localhost:3003" 
        : "https://oscarexpert.com";
    
    const emptyProps: IInitialProps = {
        app: { url, notification: undefined },
        auth: { 
            token: undefined,
            user: undefined
        },
    };

    const c = cookies(context); // for getting cookies
    const cookie = useCookie(context); // for setting cookies

    if (c.accessToken) {
        console.log('access token found')
        try {
            const verifyTokenResponse: IVerifyTokenResponse = await verifyToken(c.accessToken);
            const { 
                status, 
                message, 
                data: { 
                    userId, 
                    updatedAccessToken 
                } 
            } = verifyTokenResponse;

            switch (status) {
                case 'error':
                    throw new Error(message);
                case 'delete':
                    cookie.set('accessToken', undefined); // deletes token
                    return { initialProps: emptyProps };
                case 'update':
                    cookie.set('accessToken', updatedAccessToken);
            };

            // Get verified user's info
            const result = await db.query(`
                SELECT username, email, image, admin
                FROM users 
                WHERE userId=${userId} 
            `);
            if (result.error) throw new Error(result.error);
            const { username, email, image, admin } = result[0];
            // Return the final props object
            return { 
                initialProps: {
                    app: emptyProps.app,
                    auth: {
                        token: updatedAccessToken 
                            ? updatedAccessToken 
                            : c.accessToken,
                        user: {
                            userId,
                            username,
                            email,
                            admin,
                            image: image ? image : '/PROFILE.png', // obsolete since this is set by default in mysql
                        }
                    },
                }
            }
        } catch(e) {
            console.log("error in _app.tsx: ", e.message);
        }
    }

    // If no accessToken, return empty props
    // Returning ...appProps is standard Next stuff
    return { initialProps: emptyProps, ...appProps };
}

export default MyApp;