import React, { useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import LoginContainer from './Login';
import Modal from '../../components/Modal';
import Notification from '../../components/Notification';
import { IUser, ILoginRoute } from '../../types';
import { IGenericResponse } from '../../types/responses';
import Context from '../../utils/context';

export default function Header() {

    const { url } = useContext(Context.App);
    const { token, user: u } = useContext(Context.Auth);

    const [user, setUser] = useState<IUser>(u);
    const [profileDropdown, setProfileDropdown] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [loginRoute, setLoginRoute] = useState<ILoginRoute>('');
    const [notification, setNotification] = useState<string>('');

    // RESET VARIOUS COMPONENTS
    function reset(): void {
        setLoginModal(false);
        setLoginRoute('');
        setNotification('');
    };

    // LOG IN
    function login(data: IUser) {
        console.log('logging user in with this data: ', data);
        setUser(data)
        reset();
        window.location.reload();
    }

    // LOG OUT
    function logout() {
        axios.get('/api/login/logout')
            .then((res: AxiosResponse<IGenericResponse>) => {
                if (res.data.status === 'error') return setNotification(res.data.message!);
                setUser(null);
                reset();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err, could not log out', err.response);
            });
    }

    // Displays login modal and sets route
    function redirect(route) {
        setLoginModal(true);
        setLoginRoute(route);
        setNotification('');
    }

    // When you click 'Incorrect Email?'
    // function deleteUserAndSignUpAgain() {
    //     // Delete the user by email
    //     axios
    //         .post('/api/signup/deleteUser', { email: user.email })
    //         .then((res) => {
    //             if (res.data.error) return setNotification(res.data.error);
    //             redirect('/signup');
    //             setNotification(res.data.message);
    //             setLoginModal(true);
    //         })
    //         .catch((err) => {
    //             // gtting an error here
    //             console.log('err in notification.jsx', err.response);
    //         });
    // }

    return (
        <>
            {notification && (
                <Notification setNotification={setNotification}>
                    {notification}
                </Notification>
            )}

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
                                onClick={() => redirect('login')}
                                className='header-button'
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => redirect('/email')}
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

                            {/** Profile Dropdown */}
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
                        size={loginRoute === 'login' ? '200px' : '350px'}
                    >
                        <LoginContainer
                            user={user}
                            loginRoute={loginRoute}
                            redirect={redirect}
                            setNotification={setNotification}
                            login={login}
                            reset={reset}
                        />
                    </Modal>
                )}
            </div>
        </>
    );
}
