import React from 'react';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import EnterEmail from './routes/EnterEmail';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import { IUser, IGenericResponse } from '../../../types';

type ILoginContainerProps = {
    user: IUser,
    loginRoute: string,
    redirect: (route: string) => void,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
    login: (data: IUser) => void,
    reset: () => void,
}

const LoginContainer = (props: ILoginContainerProps) => {
    const {
        user,
        loginRoute,
        redirect,
        setNotification,
        login,
        reset,
    } = props;

    // RESEND VERIFICATION EMAIL
    // function sendVerificationEmail(email, username) {
    //     const payload = { email, username };
    //     axios
    //         .post('/api/signup/resendVerification', payload)
    //         .then((res) => {
    //             if (res.data.error) return setNotification(res.data.error);
    //             redirect('');
    //             setNotification(res.data.message);
    //             setResendEmailLink(false);
    //         })
    //         .catch((err) => {
    //             console.log(
    //                 'err, could not resend verification email',
    //                 err.response
    //             );
    //         });
    // }

    return (
        <div id='login-container' className={`container-${loginRoute}`}>

            {loginRoute === 'login' && (
                <Login
                    redirect={redirect}
                    login={login}
                    setNotification={setNotification}
                />
            )}

            {loginRoute === 'email' && (
                <EnterEmail
                    setNotification={setNotification}
                />
            )}

            {loginRoute === 'signup' && (
                <SignUp
                    user={user}
                    setNotification={setNotification}
                />
            )}

            {loginRoute === 'forgotPassword' && (
                <ForgotPassword
                    user={user}
                    redirect={redirect}
                    setNotification={setNotification}
                />
            )}

            {loginRoute === 'resetPassword' && (
                <ResetPassword
                    user={user}
                    redirect={redirect}
                    setNotification={setNotification}
                    login={login}
                />
            )}

        </div>
    );
};

export default LoginContainer;
