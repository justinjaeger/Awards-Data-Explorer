import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { AppBar, Modal, Toolbar } from '@mui/material';
import { ILoginRoute, IUser } from '../../types';
import { useNotification } from '../../context/notification';
import { useAuthState } from '../../context/auth';
import Login from '../Header/forms/Login';
import HeaderItem from './HeaderItem';

const Header = () => {
    const [session] = useSession();
    const { user, setUser } = useAuthState();
    const { setNotification } = useNotification();
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [form, setForm] = useState<ILoginRoute>(undefined);

    // RESET VARIOUS COMPONENTS
    function reset(notification?: string): void {
        setLoginModal(false);
        setForm(undefined);
        notification
            ? setNotification(notification)
            : setNotification(undefined);
    }

    // LOG OUT
    function logout(): void {
        axios
            .delete('/api/login')
            .then((res) => {
                if (res.data.status === 'error') {
                    return setNotification(res.data.message!);
                }
                setUser(undefined);
                reset();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err, could not log out', err.response);
            });
    }

    // LOG IN
    function login(user: IUser): void {
        reset();
        setUser(user);
        window.location.reload();
    }

    function changeForm(route: ILoginRoute): void {
        setLoginModal(true);
        setForm(route);
    }

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
                        {!session ? (
                            <>
                                <HeaderItem
                                    label={'Log In'}
                                    onClick={() => changeForm('login')}
                                />
                                <HeaderItem
                                    label={'Sign Up'}
                                    onClick={() => changeForm('signup')}
                                />
                            </>
                        ) : (
                            <>
                                <HeaderItem
                                    label={`Welcome, ${user.username}`}
                                    href={`/user/${user.username}`}
                                    onClick={() => changeForm('signup')}
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
                onClose={() => setLoginModal(false)}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <>
                    {form === 'login' && <Login label={'Log In'} />}
                    {form === 'signup' && <Login label={'Sign Up'} />}
                </>
            </Modal>
        </>
    );
};

export default Header;
