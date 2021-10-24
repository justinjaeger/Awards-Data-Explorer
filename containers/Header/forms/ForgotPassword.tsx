import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNotification } from '../../../context/notification';

type IForgotPasswordProps = {
    reset: (notification?: string) => void;
};

function ForgotPassword(props: IForgotPasswordProps) {
    const { setNotification } = useNotification();
    const [email, setEmail] = useState<string>('');

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(e) {
        axios
            .post('/api/login/password/reset1', {
                email,
            })
            .then((res) => {
                if (['error', 'rejected'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                }
                props.reset(`Success! An email was sent to ${email}`);
            })
            .catch((err) => {
                console.log('error in ForgotPassword.tsx', err.response);
            });

        e.preventDefault();
    }

    return (
        <>
            <div className="login-message">
                Enter your email to reset your password
            </div>

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
                    Submit
                </button>
            </form>
        </>
    );
}

export default ForgotPassword;
