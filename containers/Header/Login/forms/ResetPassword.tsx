import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setUser } from '../../../../context/auth';

function ResetPassword(props) {
    const { changeForm, login } = props;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function validateForm() {
        return password.length > 0 && confirmPassword.length > 0;
    }

    function handleSubmit(event) {
        const payload = {
            email,
            password,
            confirmPassword,
        };
        // Type this response
        axios.post('/api/login/resetPassword', payload)
            .then((res) => {
                if (res.data.error) return setNotification(res.data.error);
                login(res.data); // log user in & send user data
            })
            .catch((err) => {
                console.log(
                    'something broke - did not log user in after changing password',
                    err.response
                );
            });

        event.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-form-label'>Password</div>
                <input
                    className='login-form-input'
                    autoFocus
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
                    Reset Password
                </button>
            </form>
        </>
    );
}

export default ResetPassword;
