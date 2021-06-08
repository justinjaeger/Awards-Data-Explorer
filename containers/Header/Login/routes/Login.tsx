import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IUser, ILoginResponse } from '../../../../types';

type ILoginProps = {
    redirect: (route: string) => void
    login: (data: IUser) => void,
    setNotification:  React.Dispatch<React.SetStateAction<string>>,
}

export default function Login(props: ILoginProps) {
    const { redirect, login, setNotification } = props;

    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function validateForm() {
        return emailOrUsername.length > 0 && password.length > 0;
    };

    function handleSubmit(event) {
        axios.post('/api/loginV2', {
            emailOrUsername,
            password,
        }).then((res: AxiosResponse<ILoginResponse>) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                };
                return login(res.data.user);
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
        <>
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
        </>
    );
}
