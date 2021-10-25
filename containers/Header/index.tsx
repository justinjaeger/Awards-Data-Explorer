import React, { useState } from 'react';
import { AppBar, Modal, Toolbar } from '@mui/material';
import { signOut, SignOutResponse, useSession } from 'next-auth/client';
import Login from '../Header/forms/Login';
import { useDeepCompareEffect } from '../../utils/hooks';
import { useAuth } from '../../context/auth';
import HeaderItem from './HeaderItem';
import AccountSetup from './forms/AccountSetup';

export type ILoginRoute = 'login' | 'account_setup' | undefined;

const Header = () => {
    const [, loading] = useSession();
    const { user } = useAuth();
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [form, setForm] = useState<ILoginRoute>();

    useDeepCompareEffect(() => {
        // If user hasn't created their username, make them do so
        if (user && !user.username) {
            changeForm('account_setup');
        }
    }, [user]);

    const changeForm = (route: ILoginRoute) => {
        setLoginModal(true);
        setForm(route);
    };

    const logout = () => {
        signOut()
            .then((res: SignOutResponse) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    return (
        <div style={{ width: '100%', flex: 1, backgroundColor: 'red' }}>
            <AppBar style={{ position: 'relative', width: '100%', flex: 1 }}>
                <Toolbar>
                    {!loading && (
                        <>
                            <HeaderItem label={'Home'} href={`/`} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    width: '100%',
                                }}
                            >
                                {!user ? (
                                    <>
                                        <HeaderItem
                                            label={'Log In'}
                                            onClick={() => changeForm('login')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <HeaderItem
                                            label={
                                                user.username
                                                    ? `Welcome, ${user.username}`
                                                    : 'Welcome, new user'
                                            }
                                            href={
                                                user.username
                                                    ? `/user/${user.username}`
                                                    : undefined
                                            }
                                        />
                                        <HeaderItem
                                            label={'Log Out'}
                                            onClick={logout}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Modal
                open={loginModal}
                onClose={
                    form === 'account_setup'
                        ? undefined
                        : () => setLoginModal(false)
                }
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <>
                    {form === 'login' && (
                        <Login close={() => setLoginModal(false)} />
                    )}
                    {form === 'account_setup' && (
                        <AccountSetup
                            close={() => setLoginModal(false)}
                            logout={logout}
                        />
                    )}
                </>
            </Modal>
        </div>
    );
};

export default Header;
