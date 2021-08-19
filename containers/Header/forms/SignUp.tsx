import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppState } from '../../../context/app';

type IEnterEmailProps = {
    reset: (notification?: string) => void;
};

export default function Signup(props: IEnterEmailProps) {
    const { setNotification } = useAppState();
    const [email, setEmail] = useState<string>('');

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(e) {
        axios
            .post('/api/login/signup/step1', { email })
            .then((res) => {
                if (res.data.status === 'rejected') {
                    return setNotification(res.data.message);
                }
                if (res.data.status === 'error') {
                    return setNotification('error');
                }
                props.reset(
                    `Account Created! Please verify the email sent to ${email}`
                );
            })
            .catch((err) => {
                console.log('error in EnterEmail: ', err.response);
            });
        e.preventDefault(); // prevents from refreshing
    }

    // IDK if I want the resend to work in the same way aka deleting the user
    // should just reset the code and delete the old one

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-label">Email</div>
            <input
                className="login-form-input"
                autoFocus
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={!validateForm()} className="submit-button">
                Create Account
            </button>
        </form>
    );
}
