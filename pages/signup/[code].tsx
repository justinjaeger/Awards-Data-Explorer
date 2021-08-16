import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useAppState } from '../../context/app';
import { useAuthState } from '../../context/auth';

// At this point, there is a user in DB with userId and email
// We use the code to get the userId
// If code is validated, show them the form to create their account
// If account creaftion successful, log them in
// to log them in, we just setUser(user) and redirect home
// as well as insert access token and such (I think that's already wired up)

export default function Home() {
    const router = useRouter();
    const { code } = router.query;

    const { setNotification } = useAppState();
    const { setUser } = useAuthState();

    const [userId, setUserId] = useState<number | undefined>(undefined);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    useEffect(() => {
        // Get the userId from the code
        // We do this instead of authenticating and going through state via useAuth()
        axios.get(`api/v2/login/signup/${code}`).then((res) => {
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
        return (
            username.length > 0 &&
            password.length > 0 &&
            confirmPassword.length > 0
        );
    }

    function handleSubmit(event) {
        axios
            .post('/api/v2/signup/step2', {
                userId,
                username,
                password,
                confirmPassword,
            })
            .then((res) => {
                if (['rejected', 'error'].includes(res.data.status)) {
                    return setNotification(res.data.message);
                }
                console.log('signup successful');
                // Log user in
                setNotification(undefined);
                setUser(res.data.user);
                // Redirect to user dashboard
                router.push(`user/${username}`);
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
                    <div className="login-form-label">Username</div>
                    <input
                        className="login-form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="login-form-label">Password</div>
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
                        Create Account
                    </button>
                </form>
            ) : (
                <div>Loading</div>
            )}
            {/* Render some sort of home page */}
        </>
    );
}
