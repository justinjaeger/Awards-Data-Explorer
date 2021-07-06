import React from 'react';
import Login from './forms/Login';
import SignUp from './forms/SignUp';
import EnterEmail from './forms/EnterEmail';
import ForgotPassword from './forms/ForgotPassword';
import ResetPassword from './forms/ResetPassword';
import { IUser, ILoginRoute} from '../../../types';

type ILoginContainerProps = {
    form: ILoginRoute;
    changeForm: (route: string) => void;
    reset: () => void;
    login: (user: IUser) => void;
}

export default function LoginContainer(props: ILoginContainerProps) {

    const {
        form,
        changeForm,
        reset,
        login,
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

    function Form(): JSX.Element {
        switch(form) {
            case 'login':
                return <Login
                    changeForm={changeForm}
                    login={login}
                />;
            // Later, once we get rid of SignUP, let's name this Signup
            case 'email':
                return <EnterEmail />
            case 'forgotPassword':
                return <ForgotPassword
                    reset={reset}
                />
            case 'resetPassword':
                return <ResetPassword
                    changeForm={changeForm}
                    login={login}
                />
        }
    }

    // this class styling -- later let's just make this inline or something
    // this is also just bad styling practice -- should have this render differently for each in the switch above
    // not positive this way of calling the functiono is going to work
    return (
        <div id='login-container' className={`container-${form}`}>
            <Form />
        </div>
    );
};
