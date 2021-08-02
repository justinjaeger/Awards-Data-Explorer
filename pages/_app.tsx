import '../styles/index.scss';
import React from 'react';
import App , { AppContext, AppProps } from 'next/app'
import prisma from '../lib/prisma';
import cookies from 'next-cookies';
import { useCookie } from 'next-cookie';
import verifyToken, { IVerifyTokenResponse } from '../utils/verifyToken';
import Header from '../containers/Header';
import { IAppContext, IAuthContext } from '../context/types';
import Context, { initialState } from '../context';
import Notification from '../components/Notification';

interface IInitialProps {
    app: IAppContext;
    auth: IAuthContext;
}

interface IMyAppProps extends AppProps {
    initialProps: IInitialProps;
}

/**
 * Component is the your page eg /index
 * pageProps injects any props from getServerSideProps in that component file
 * initialProps injects props from getInitialProps
 */

 function MyApp({ Component, pageProps, initialProps }: IMyAppProps) {(
    <Context.App.Provider value={initialProps.app}>
        <Context.Auth.Provider value={initialProps.auth}>
            <Notification />
            <Header />
            <Component {...pageProps} {...initialProps} />
        </Context.Auth.Provider>
    </Context.App.Provider>
)}


/**
 * Authenticates user
 * If accessToken exists, verify it
 * If verified, populate page with user data
 */

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    const url: string = (process.env.NODE_ENV === "development") 
        ? "http://localhost:3003" 
        : "https://oscarexpert.com";
    
    const initialProps: IInitialProps = {
        app: {
            ...initialState.app, 
            url
        },
        auth: { 
            ...initialState.auth,
        },
        ...appProps
    };

    const c = cookies(context.ctx); // for getting cookies
    const cookie = useCookie(context.ctx); // for setting cookies

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
                    return { initialProps };
                case 'update':
                    cookie.set('accessToken', updatedAccessToken);
            };

            const { id, username, email, image, role } = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            // Return the final props object
            return {
                ...initialProps,
                auth: {
                    ...initialProps.auth,
                    token: updatedAccessToken 
                        ? updatedAccessToken 
                        : c.accessToken,
                    user: {
                        id,
                        username,
                        email,
                        role,
                        image,
                    }
                },
            };
        } catch(e) {
            console.log("error in _app.tsx: ", e.message);
            throw new Error(e.message)
        }
    }

    // If no accessToken, return initial props
    // Returning ...appProps is standard Next stuff
    return { initialProps };
}

export default MyApp;