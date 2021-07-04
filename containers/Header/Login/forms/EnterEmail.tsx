import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ISignupStepOneResponse } from '../../../../types/responses';
import { setNotification } from '../../../../context/app';

export default function EnterEmail() {

    const [email, setEmail] = useState<string>('');
    const [userId, setUserId] = useState<number | null>(null);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [displayResend, setDisplayResend] = useState<boolean>(true);

    function validateForm() { 
        return email.length > 0 
    };

    function handleSubmit(event) {
        // If success, display confirmation message
        axios.post('/api/v2/login/signup/step1', { email })
            .then((res: AxiosResponse<ISignupStepOneResponse>) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                };
                setConfirm(true);
                setUserId(res.data.userId);
            })
            .catch((err) => {
                console.log('error in EnterEmail: ', err.response);
            });
        event.preventDefault(); // prevents from refreshing
    };

    function removeUser() {
        axios.delete(`/api/v2/login/signup/:${userId}`)
        .then((res: AxiosResponse) => {
            if (['rejected', 'error'].includes(res.data.status)) {
                return setNotification(res.data.message);
            };
            setConfirm(false);
            setEmail('');
            setDisplayResend(false);
        })
        .catch((err: AxiosResponse) => {
            console.log('error2 in signup', err.data.message); // DATE Wonder if this names sense that it woudl be the same structure response
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
