import React, { useEffect, useState } from "react";
import router from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { IVerifyCodeResponse, ILoginResponse } from '../../types/responses';
import { setNotification } from '../../context/app';
import { setUser } from "../../context/auth";

export default function Home() {

    const { code } = router.query;

    const [verified, setVerified] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [userId, setUserId] = useState<number | undefined>(undefined);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    useEffect(() => {
        axios.get(`api/v2/login/signup/${code}`)
            .then((res: AxiosResponse<IVerifyCodeResponse>) => {
                if (res.data.status === 'error') {
                    // navigate to home screen
                    return res.redirect('/');
                }
                if (res.data.status === 'success') {
                    setEmail(res.data.email);
                    setUserId(res.data.userId);
                    setVerified(true);
                }
            })
    }, [verified])

    function validateForm() {
        return username.length > 0 
            && password.length > 0 
            && confirmPassword.length > 0;
    }

    function handleSubmit(event) {
        axios.post('/api/v2/signup/step2', {
            userId,
            username,
            password,
            confirmPassword,
        }).then((res: AxiosResponse<ILoginResponse>) => {
                if (res.data.status === 'rejected') return setNotification(res.data.message);
                if (res.data.status === 'error') return setNotification('error');
                console.log('signup successful, redirecting');
                // Log user in
                setNotification(undefined);
                setUser(res.data.user);
                // Redirect to dashboard
                return res.redirect(`/user/${username}`);
            })
            .catch((err) => {
                console.log('error in signup', err.response);
            });

        event.preventDefault(); // prevents it from refreshing
    }

    // At this point, there is a user in DB with userId and email
    // We use the code to get the userId
    // If no userId associated, we show them a message "invalid code" or redirect home
    // If userId found, show them the form to create their account
    // If account creaftion successful, log them in
        // to log them in, we just setUser(user) and redirect home
        // as well as insert access token and such (I think that's already wired up)

    return (
        <>
            {verified 
            ?
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-form-label'>Email</div>
                <input
                    className='login-form-input'
                    autoFocus
                    type='text'
                    value={email}
                    readOnly={true}
                />

                <div className='login-form-label'>Username</div>
                <input
                    className='login-form-input'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className='login-form-label'>Password</div>
                <input
                    className='login-form-input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='login-form-label'>Confirm Password</div>
                <input
                    className='login-form-input'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button disabled={!validateForm()} className='submit-button'>
                    Create Account
                </button>
            </form>
            : <>Loading</>}
            {/* Render some sort of home page */}
        </>
    );
}
