import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from '../../../../types/responses';
import { setNotification } from '../../../../context/app';
import { setUser } from '../../../../context/auth';
import ResetPassword from './ResetPassword';

type ILoginProps = {
    redirect: (route: string) => void
    reset: () => void,
}

export default function Login(props: ILoginProps) {

    const { redirect, reset } = props;

    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function validateForm() {
        return emailOrUsername.length > 0 && password.length > 0;
    };

    function handleSubmit(event) {
        axios.post('/api/v2/login', {
            emailOrUsername,
            password,
        }).then((res: AxiosResponse<ILoginResponse>) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                };
                setUser(res.data.user);
                reset();
                window.location.reload();
            })
            .catch((err) => {
                if (err)
                    console.log(
                        'something went wrong trying to log user in',
                        err
                    );
            });
        event.preventDefault(); // prevents it from refreshing
    };

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='login-form-label'>Email or Username</div>
            <input
                className='login-form-input'
                autoFocus
                type='text'
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
            />

            <div className='login-form-label'>Password</div>
            <input
                className='login-form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={!validateForm()} className='submit-button'>
                Submit
            </button>

            <button
                onClick={() => redirect('forgotPassword')}
                className='forgot-password-button'
            >
                Forgot your password?
            </button>
        </form>
    );
}
