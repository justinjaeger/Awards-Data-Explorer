import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Blank from "./components/Blank";

const LoginContainer = (props) => {
    const {
        userId,
        route,
        setRoute,
        username,
        setUsername,
        email,
        setEmail,
        resendEmailLink,
        setResendEmailLink,
        reEnterEmailLink,
        setReEnterEmailLink,
        changeEmailLink,
        setChangeEmailLink,
        login,
        setLoginDropdown,
        setNotification,
    } = props;

    // RESEND VERIFICATION EMAIL
    function sendVerificationEmail(email, username) {
        const payload = { email, username };
        axios
            .post("/api/signup/resendVerification", payload)
            .then((res) => {
                if (res.data.error) return setNotification(res.data.error);
                setRoute("/blank");
                setNotification(res.data.message);
                setResendEmailLink(false);
            })
            .catch((err) => {
                console.log(
                    "err, could not resend verification email",
                    err.response
                );
            });
    }

    // TAKE USER TO RESET PASSWORD SCREEN
    function loadPasswordReset() {
        setRoute("/forgotPassword");
        setReEnterEmailLink(false);
    }

    // TAKE USER TO SIGNUP SCREEN
    function loadSignup() {
        setRoute("/signup");
        setChangeEmailLink(false);
    }

    // =============================== //

    const r = route.slice(1);
    console.log("r", r);
    return (
        <div id="login-container" className={`container-${r}`}>

            {route === "/login" && (
                <Login
                    setRoute={setRoute}
                    username={username}
                    login={login}
                    setNotification={setNotification}
                    setResendEmailLink={setResendEmailLink} // delete
                    setReEnterEmailLink={setReEnterEmailLink} // delete
                />
            )}

            {route === "/email" && (
                <EnterEmail
                    setNotification={setNotification}
                />
            )}

            {route === "/signup" && (
                <SignUp
                    userId={userId}
                    email={email}
                    setNotification={setNotification}
                />
            )}

            {route === "/forgotPassword" && (
                <ForgotPassword
                    setRoute={setRoute} // probably delete
                    setNotification={setNotification}
                    setReEnterEmailLink={setReEnterEmailLink} // probably delete
                />
            )}

            {route === "/resetPassword" && (
                <ResetPassword
                    email={email}
                    setRoute={setRoute} // probably delete
                    setNotification={setNotification}
                    login={login}
                />
            )}

            {route === "/blank" && <></> /* do we need this anymore? */}

            {/* {resendEmailLink && (
                <div className="login-message">
                    <button
                        onClick={() => {
                            sendVerificationEmail(
                                resendEmailLink.email,
                                resendEmailLink.username
                            );
                        }}
                        className="click-here-button"
                    >
                        Click here
                    </button>{" "}
                    to resend email
                </div>
            )}

            {reEnterEmailLink && (
                <div className="login-message">
                    <button
                        onClick={() => {
                            loadPasswordReset();
                        }}
                        className="click-here-button"
                    >
                        Re-enter email
                    </button>
                </div>
            )}

            {changeEmailLink && (
                <div className="login-message">
                    <button
                        onClick={() => {
                            loadSignup();
                        }}
                        className="click-here-button"
                    >
                        Change email
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default LoginContainer;
