// import '../styles/index.scss';
import '../styles/index.css';
import React from 'react';
import { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import { ThemeProvider } from '@mui/material';
import Header from '../containers/Header';
import NotificationProvider from '../context/notification';
import AuthProvider from '../context/auth';
import muiTheme from '../theme/muiTheme';
import theme from '../theme';

/**
 * Component is the your page eg /index
 * pageProps is whatever you get from getServerSideProps in your component
 * 
 * Try to get this initial load down: 
 * https://dev.to/estruyf/devhack-optimizing-initial-load-js-from-next-js-5c3d
 * - experiment with dynamic imports
 */

const App = ({ Component, pageProps }: AppProps) => {
    return (<>
        <ThemeProvider theme={muiTheme}>
            <SessionProvider session={pageProps.session}>
                <AuthProvider>
                    <NotificationProvider>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                backgroundColor: theme.colors.white,
                            }}
                        >
                            <Header />
                            <Component {...pageProps} />
                        </div>
                    </NotificationProvider>
                </AuthProvider>
            </SessionProvider>
        </ThemeProvider>
        </>
    );
};

export default App;
