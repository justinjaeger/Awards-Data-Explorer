import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default EnterEmail = (props) => {
    const { setNotification } = props;

    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(undefined);
    const [confirm, setConfirm] = useState(false);
    const [displayResend, setDisplayResend] = userState(true);

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(event) {
        // If success, display confirmation message
        axios.post('/api/login/signup/step1', { email })
            .then((res) => {
                if (res.data.error) return setNotification(res.data.error);
                setConfirm(true);
                setUserId(res.data.userId);
            })
            .catch((err) => {
                console.log('error1 in signup', err.response);
            });
        event.preventDefault(); // prevents it from refreshing
    };

    function removeUser() {
        axios.delete('/api/login/signup/step1', { userId })
        .then((res) => {
            setConfirm(false);
            setEmail(false);
            setDisplayResend(false);
        })
        .catch((err) => {
            console.log('error2 in signup', err.response);
        });
    };

    return (
        <>
            {!confirm 
                ? <form onSubmit={handleSubmit} className='login-form'>
                    <div className='login-form-label'>Email</div>
                    <input
                        className='login-form-input'
                        autoFocus
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={!validateForm()} className='submit-button'>
                        Create Account
                    </button>
                </form>
                : <>
                <div>Please verify the email sent to {email}.</div>
                    {displayResend && <div className='login-message'>
                        Incorrect email?
                        <button
                            onClick={removeUser}
                            className='click-here-button'
                        >
                            Click here to resend.
                        </button>
                    </div>}
                </>
            }
        </>
    );
}
