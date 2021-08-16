import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useAppState } from '../../context/app';
import { useAuthState } from '../../context/auth';

// This opens when user clicks their password reset link in their email
// We use the code to get the userId
// If code is validated, show them the form to create their account
// If account creaftion successful, log them in
// to log them in, we just setUser(user) and redirect home

export default function Home() {
    const router = useRouter();
    const { code } = router.query;

    const { setNotification } = useAppState();
    const { setUser } = useAuthState();

    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    useEffect(() => {
        // Get the userId from the code
        // We do this instead of authenticating and going through state via useAuth()
        axios.get(`api/login/signup/${code}`).then((res) => {
            if (res.data.status === 'error') {
                // navigate to home screen
                router.push('/');
            }
            if (res.data.status === 'rejected') {
                // means code is expired
                setNotification(res.data.message);
            }
            if (res.data.status === 'success') {
                setUserId(res.data.userId);
            }
        });
    }, [userId]);

    function validateForm() {
        return password.length > 0 && confirmPassword.length > 0;
    }

    function handleSubmit(event) {
        axios
            .post('/api/password/reset2', {
                userId,
                password,
                confirmPassword,
            })
            .then((res) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                }
                console.log('password reset successful');
                // Log user in
                setNotification(undefined);
                setUser(res.data.user);
                // Redirect to user dashboard
                router.push(`user/${res.data.user.username}`);
            })
            .catch((err) => {
                console.log('error in signup', err.response);
            });

        event.preventDefault(); // prevents it from refreshing
    }

    return (
        <>
            {userId ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-label">New Password</div>
                    <input
                        className="login-form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="login-form-label">Confirm Password</div>
                    <input
                        className="login-form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        disabled={!validateForm()}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div>Loading</div>
            )}
            {/* Render some sort of home page */}
        </>
    );
}
