import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppState } from '../../../../context/app';
import { IUser, ILoginRoute } from '../../../../types';

type ILoginProps = {
    changeForm: (form: ILoginRoute) => void;
    login: (user: IUser) => void;
};

export default function Login(props: ILoginProps) {
    const { setNotification } = useAppState();
    const { changeForm, login } = props;

    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function validateForm() {
        return emailOrUsername.length > 0 && password.length > 0;
    }

    function handleSubmit(e) {
        axios
            .post('/api/v2/login', {
                emailOrUsername,
                password,
            })
            .then((res) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                }
                return login(res.data.user);
            })
            .catch((e) => {
                console.log('error logging user in', e.message);
            });
        e.preventDefault(); // prevents it from refreshing
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-label">Email or Username</div>
            <input
                className="login-form-input"
                autoFocus
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
            />

            <div className="login-form-label">Password</div>
            <input
                className="login-form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={!validateForm()} className="submit-button">
                Submit
            </button>

            <button
                onClick={() => changeForm('forgotPassword')}
                className="forgot-password-button"
            >
                Forgot your password?
            </button>
        </form>
    );
}
