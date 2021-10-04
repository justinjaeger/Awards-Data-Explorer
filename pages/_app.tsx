import '../styles/index.scss';
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@mui/material';
import Header from '../containers/Header';
import NotificationProvider from '../context/notification';
import AuthProvider from '../context/auth';
import muiTheme from '../theme/muiTheme';

/**
 * Component is the your page eg /index
 * pageProps is whatever you get from getServerSideProps in your component
 */

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <Provider session={pageProps.session}>
                <AuthProvider>
                    <NotificationProvider>
                        <Header />
                        <Component {...pageProps} />
                    </NotificationProvider>
                </AuthProvider>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
