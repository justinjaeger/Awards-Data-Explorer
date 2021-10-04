import React, { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/client';
import theme from '../../../theme';
import FormInput from '../../../components/UI/FormInput';
import FormButton from '../../../components/UI/FormButton';
import { useNotification } from '../../../context/notification';

type ILoginModalProps = {
    label: string;
};

export default function Login(props: ILoginModalProps) {
    const { label } = props;
    const { setNotification } = useNotification();
    const [email, setEmail] = useState<string>('');

    const handleSignIn = async () => {
        // sends email to this address if valid account (so long as you provide email)
        // can potentially wrap this and check for other things before submitting request
        console.log('email signIn', email);
        signIn('email', {
            email: email, // change back to email
            callbackUrl: 'http://localhost:3003/test', // NEEDS TO CHANGE
            redirect: false,
        })
            .then((res: SignInResponse) => {
                setNotification({ message: 'hello', status: 'error' });
                console.log('resssssssssssssss', res);
            })
            .catch((err) => {
                console.log('errrrrrrrrrrrrrrrr', err);
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: theme.colors.white,
                width: '90%',
                maxWidth: 350,
                marginTop: window.outerHeight / 8,
                borderRadius: 8,
                height: 200,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '90%',
                    maxWidth: '80%',
                    marginBottom: 20,
                }}
            >
                <FormInput title={'Email'} input={email} setInput={setEmail} />
                <FormButton
                    disabled={!email.includes('.') || !email.includes('@')}
                    onClick={() => handleSignIn()}
                    text={label}
                />
            </div>
        </div>
    );
}
