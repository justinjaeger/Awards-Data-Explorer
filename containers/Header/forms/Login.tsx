import React, { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/client';
import { Typography } from '@mui/material';
import FormInput from '../../../components/UI/FormInput';
import FormButton from '../../../components/UI/FormButton';
import { useNotification } from '../../../context/notification';
import { FormContainer, FormContent } from './styles';

type ILoginProps = {
    close: () => void;
};

const Login = (props: ILoginProps) => {
    const { close } = props;
    const { setNotification } = useNotification();
    const [success, setSuccess] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    /**
     * sends email to this address if valid account (so long as you provide email)
     * can potentially wrap this and check for other things before submitting request
     */
    const handleSignIn = async () => {
        signIn('email', {
            email: email,
            redirect: false,
        })
            .then((res: SignInResponse) => {
                if (res.status === 200) {
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log('err', err);
                setNotification({ message: err.message, status: 'error' });
            });
    };

    const disabled = () => {
        if (email.includes('.') && email.includes('@')) {
            return false;
        }
        return true;
    };

    const FORM_HEIGHT = 200;

    return (
        <FormContainer height={FORM_HEIGHT} window={window}>
            <FormContent>
                {success ? (
                    <>
                        <Typography
                            style={{
                                textAlign: 'center',
                                width: '100%',
                                fontSize: 20,
                            }}
                        >
                            Success! Check your email to verify.
                        </Typography>
                        <FormButton
                            disabled={disabled()}
                            onClick={() => close()}
                            text={'close'}
                        />
                    </>
                ) : (
                    <>
                        <FormInput
                            title={'Email'}
                            input={email}
                            setInput={setEmail}
                        />
                        <FormButton
                            disabled={disabled()}
                            onClick={() => handleSignIn()}
                            text={'Log In'}
                        />
                    </>
                )}
            </FormContent>
        </FormContainer>
    );
};

export default Login;
