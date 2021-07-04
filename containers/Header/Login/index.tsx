import React from 'react';
import Login from './forms/Login';
import SignUp from './forms/SignUp';
import EnterEmail from './forms/EnterEmail';
import ForgotPassword from './forms/ForgotPassword';
import ResetPassword from './forms/ResetPassword';

type ILoginContainerProps = {
    form: string,
    redirect: (route: string) => void,
    reset: () => void,
}

export default function LoginContainer(props: ILoginContainerProps) {

    const {
        form,
        redirect,
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

    function RenderInside(): JSX.Element {
        switch(form) {
            case 'login':
                return <Login
                    redirect={redirect}
                    reset={reset}
                />;
            case 'email':
                return <EnterEmail />
            case 'signup':
                return <SignUp />
            case 'forgotPassword':
                return <ForgotPassword
                    redirect={redirect}
                />
            case 'resetPassword':
                return <ResetPassword
                    redirect={redirect}
                    reset={reset}
                />
            default:
                return <></>;
        }
    }

    // this class styling -- later let's just make this inline or something
    // this is also just bad styling practice -- should have this render differently for each in the switch above
    // not positive this way of calling the functiono is going to work
    return (
        <div id='login-container' className={`container-${form}`}>
            <RenderInside />
        </div>
    );
};
