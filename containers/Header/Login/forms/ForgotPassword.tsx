import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setNotification } from '../../../../context/app';

type IForgotPasswordProps = {
    reset: () => void;
}

function ForgotPassword(props: IForgotPasswordProps) {
    const { reset } = props;

    const [email, setEmail] = useState('');

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(event) {
        const payload = { email };

        // Request will send the user a verification email, so it won't return anything back except a message
        // That's all it needs to do
        // Needs a typed axios response
        axios.post('/api/v2/login/sendPassResetEmail', payload)
            .then((res) => {
                if (res.data.error) {
                    return setNotification(res.data.error)
                };
                reset();
                setNotification(res.data.message);
            })
            .catch((err) => {
                console.log('err', err.response);
            });

        event.preventDefault();
    }

    return (
        <>
            <div className='login-message'>
                Enter your email to reset your password
            </div>

            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-form-label'>Email</div>
                <input
                    className='login-form-input'
                    autoFocus
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button disabled={!validateForm()} className='submit-button'>
                    Submit
                </button>
            </form>
        </>
    );
}

export default ForgotPassword;
