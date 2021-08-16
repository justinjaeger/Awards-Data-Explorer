import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Modal from '../../components/Modal';
import { ILoginRoute, IUser } from '../../types';
import { useAppState } from '../../context/app';
import { useAuthState } from '../../context/auth';
import LoginContainer from './Login';

export default function Header() {
    const { user, setUser } = useAuthState();
    const { url, setNotification } = useAppState();

    const [profileDropdown, setProfileDropdown] = useState<boolean>(false);
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
            .delete('/api/v2/login')
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
            <div id="Header">
                <div id="header-left">
                    <a href={url} className="home-button">
                        Home
                    </a>
                </div>

                <div id="header-right">
                    {!user ? (
                        <>
                            <div id="left-header-margin" />
                            <button
                                onClick={() => changeForm('login')}
                                className="header-button"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => changeForm('email')}
                                className="header-button"
                            >
                                Sign Up
                            </button>
                            <div id="right-header-margin" />
                        </>
                    ) : (
                        <>
                            <div id="header-message">
                                Welcome,{' '}
                                <a
                                    href={`${url}/user/${user.username}`}
                                    className="header-button"
                                >
                                    {user.username}
                                </a>
                            </div>
                            <button
                                onMouseEnter={() =>
                                    setProfileDropdown(!profileDropdown)
                                }
                                onClick={() => setProfileDropdown(true)}
                                className="header-button"
                            >
                                <img
                                    className="profile-image-xsm header-profile-pic"
                                    src={user.image}
                                />
                            </button>

                            {profileDropdown && (
                                <div
                                    id="profile-dropdown"
                                    onMouseLeave={() =>
                                        setProfileDropdown(false)
                                    }
                                >
                                    <a
                                        className="profile-dropdown-button no-underline"
                                        href={`${url}/user/${user.username}`}
                                    >
                                        My Profile
                                    </a>
                                    <button
                                        className="profile-dropdown-button"
                                        onClick={logout}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {loginModal && (
                    <Modal
                        setModal={setLoginModal}
                        size={form === 'login' ? 200 : 350}
                    >
                        <LoginContainer
                            form={form}
                            changeForm={changeForm}
                            reset={reset}
                            login={login}
                        />
                    </Modal>
                )}
            </div>
        </>
    );
}
