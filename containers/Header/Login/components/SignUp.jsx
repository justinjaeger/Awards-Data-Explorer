import React, { useState, useEffect } from "react";
import axios from "axios";

function SignUp(props) {
    const { userId, email, setNotification } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        const payload = {
            userId,
            username,
            password,
            confirmPassword,
        };

        axios.post("/api/signup/step2", payload)
            .then((res) => {
                if (res.data.error) return setNotification(res.data.error);
                console.log("signup successful, redirecting");
                // Redirect to dashboard
                return res.redirect(`/user/${username}`);
            })
            .catch((err) => {
                console.log("error in signup", err.response);
            });

        event.preventDefault(); // prevents it from refreshing
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-label">Email</div>
                <input
                    className="login-form-input"
                    autoFocus
                    type="text"
                    value={email}
                    readOnly={true}
                />

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

                <button disabled={!validateForm()} className="submit-button">
                    Create Account
                </button>
            </form>
        </>
    );
}

export default SignUp;
