import '../styles/index.scss';
import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import cookies from 'next-cookies';
import { useCookie } from 'next-cookie';
import prisma from '../lib/prisma';
import verifyToken, { IVerifyTokenResponse } from '../utils/verifyToken';
import Header from '../containers/Header';
import { IAppContext, IAuthContext } from '../context/types';
import AppProvider, { initialAppContext } from '../context/app';
import AuthProvider, { initialAuthContext } from '../context/auth';
// import Context, { initialState } from '../context';
import Notification from '../components/Notification';

export interface IInitialProps {
    app: IAppContext;
    auth: IAuthContext;
}

interface IMyAppProps extends AppProps {
    initialProps: IInitialProps;
}

/**
 * Component is the your page eg /index
 * pageProps injects any props from getServerSideProps in that component file
 * initialProps injects props from ßgetInitialProps
 */

function MyApp({ Component, pageProps, initialProps }: IMyAppProps) {
    <AppProvider value={initialProps.app}>
        <AuthProvider value={initialProps.auth}>
            <Notification />
            <Header />
            <Component {...pageProps} {...initialProps} />
        </AuthProvider>
    </AppProvider>;
}

/**
 * Authenticates user
 * If accessToken exists, verify it
 * If verified, populate page with user data
 */

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    // This feels like you shouldn't have to do this
    const url: string =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003'
            : 'https://www.oscarexpert.com';

    // Returning ...appProps is standard Next.js practice
    const initialProps: IInitialProps = {
        app: {
            ...initialAppContext,
            url,
        },
        auth: {
            ...initialAuthContext,
        },
        ...appProps,
    };

    const c = cookies(context.ctx); // for getting cookies
    // below: disable because useCookie is not actually a hook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cookie = useCookie(context.ctx); // for setting cookies

    if (c.accessToken) {
        console.log('access token found');
        try {
            const verifyTokenResponse: IVerifyTokenResponse = await verifyToken(
                c.accessToken
            );
            const {
                status,
                message,
                data: { id, updatedAccessToken },
            } = verifyTokenResponse;

            switch (status) {
                case 'error':
                    throw new Error(message);
                case 'delete':
                    cookie.set('accessToken', undefined); // deletes token
                    return { initialProps };
                case 'update':
                    cookie.set('accessToken', updatedAccessToken);
            }

            const { username, email, image, role } =
                await prisma.user.findUnique({
                    where: {
                        id,
                    },
                });

            // Return the final props object
            return {
                app: initialProps.app,
                auth: {
                    ...initialProps.auth,
                    token: updatedAccessToken || c.accessToken,
                    user: {
                        id,
                        username,
                        email,
                        role,
                        image,
                    },
                },
            };
        } catch (e) {
            console.log('error in _app.tsx: ', e.message);
            throw new Error(e.message);
        }
    }

    // If no accessToken, return initial props
    return { initialProps };
};

export default MyApp;
