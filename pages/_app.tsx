import '../styles/index.scss';
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Header from '../containers/Header';
import AppProvider from '../context/app';
import AuthProvider from '../context/auth';

import Notification from '../components/Notification';

/**
 * Component is the your page eg /index
 * pageProps is whatever you get from getServerSideProps in your component
 */

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider session={pageProps.session}>
            <AuthProvider>
                <AppProvider>
                    {/* <Notification /> */}
                    {/* <Header /> */}
                    <Component {...pageProps} />
                </AppProvider>
            </AuthProvider>
        </Provider>
    );
};

export default App;
