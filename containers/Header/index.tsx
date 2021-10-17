import React, { useState } from 'react';
import { AppBar, Modal, Toolbar } from '@mui/material';
import { signOut, SignOutResponse } from 'next-auth/client';
import { ILoginRoute } from '../../types';
import { useAuth } from '../../context/auth';
import Login from '../Header/forms/Login';
import { useDeepCompareEffect } from '../../utils/hooks';
import HeaderItem from './HeaderItem';
import AccountSetup from './forms/AccountSetup';

const Header = () => {
    const { user } = useAuth();
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [form, setForm] = useState<ILoginRoute>(undefined);

    // If user hasn't created their username, make them do so
    useDeepCompareEffect(() => {
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
        <>
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <HeaderItem label={'Home'} href={'/'} />
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
        </>
    );
};

export default Header;
