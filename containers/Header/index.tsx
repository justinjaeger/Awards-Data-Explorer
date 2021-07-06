import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import LoginContainer from './Login';
import Modal from '../../components/Modal';
import Notification from '../../components/Notification';
import { ILoginRoute, IUser } from '../../types';
import { IGenericResponse } from '../../types/responses';
import { 
    url, 
    notification, 
    setNotification 
} from '../../context/app';
import { user, setUser } from '../../context/auth';

export default function Header() {

    const [profileDropdown, setProfileDropdown] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [form, setForm] = useState<ILoginRoute>(undefined);

    // LOG OUT
    function logout() {
        axios.get('/api/v2/login/logout')
            .then((res: AxiosResponse<IGenericResponse>) => {
                if (res.data.status === 'error') {
                    return setNotification(res.data.message!)
                };
                setUser(undefined);
                reset();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err, could not log out', err.response);
            });
    }

    // RESET VARIOUS COMPONENTS
    function reset(): void {
        setLoginModal(false);
        setForm(undefined);
        setNotification(undefined);
    };

    function login(user: IUser): void { 
        reset();
        setUser(user);
        window.location.reload();
    };

    function changeForm(route) {
        setLoginModal(true);
        setForm(route);
    }

    return (
        <>
            {notification && <Notification />}

            <div id='Header'>
                <div id='header-left'>
                    <a href={url} className='home-button'>
                        Home
                    </a>
                </div>

                <div id='header-right'>
                    {!user ? (
                        <>
                            <div id='left-header-margin'></div>
                            <button
                                onClick={() => changeForm('login')}
                                className='header-button'
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => changeForm('/email')}
                                className='header-button'
                            >
                                Sign Up
                            </button>
                            <div id='right-header-margin'></div>
                        </>
                    ) : (
                        <>
                            <div id='header-message'>
                                Welcome,{' '}
                                <a
                                    href={`${url}/user/${user.username}`}
                                    className='header-button'
                                >
                                    {user.username}
                                </a>
                            </div>
                            <button
                                onMouseEnter={() =>
                                    setProfileDropdown(!profileDropdown)
                                }
                                onClick={() => setProfileDropdown(true)}
                                className='header-button'
                            >
                                <img
                                    className='profile-image-xsm header-profile-pic'
                                    src={user.image}
                                ></img>
                            </button>

                            {profileDropdown && (
                                <div
                                    id='profile-dropdown'
                                    onMouseLeave={() => setProfileDropdown(false)}
                                >
                                    <a
                                        className='profile-dropdown-button no-underline'
                                        href={`${url}/user/${user.username}`}
                                    >
                                        My Profile
                                    </a>
                                    <button
                                        className='profile-dropdown-button'
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
                        size={form === 'login' ? '200px' : '350px'}
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
