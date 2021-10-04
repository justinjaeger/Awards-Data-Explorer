import React from 'react';
import { IUser, ILoginRoute } from '../../../types';
import theme from '../../../theme';
import Login from './Login';
import Signup from './SignUp';
import ForgotPassword from './ForgotPassword';

type ILoginContainerProps = {
    form: ILoginRoute;
    changeForm: (form: ILoginRoute) => void;
    reset: (notification?: string) => void;
    login: (user: IUser) => void;
};

export default function LoginContainer(props: ILoginContainerProps) {
    const { form, changeForm, reset, login } = props;

    function Form(): JSX.Element {
        switch (form) {
            case 'login':
                return <Login changeForm={changeForm} login={login} />;
            case 'email':
                return <Signup reset={reset} />;
            case 'forgotPassword':
                return <ForgotPassword reset={reset} />;
        }
    }

    // this class styling -- later let's just make this inline or something
    // this is also just bad styling practice -- should have this render differently for each in the switch above
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                background: theme.colors.offBlack,
                padding: 20,
            }}
        >
            <Form />
        </div>
    );
}
