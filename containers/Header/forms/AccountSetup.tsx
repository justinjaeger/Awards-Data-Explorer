import React, { useState } from 'react';
import { Link, Typography } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useSession } from 'next-auth/client';
import FormInput from '../../../components/UI/FormInput';
import FormButton from '../../../components/UI/FormButton';
import { useNotification } from '../../../context/notification';
import { ICreateUsernameResponse } from '../../../pages/api/user/username/[email]';
import { ISession } from '../../../types';
import { useAuth } from '../../../context/auth';
import { profanityFilter, validateUsername } from '../../../utils/Filter';
import { FormContainer, FormContent } from './styles';

type ISignupProps = {
    close: () => void;
    logout: () => void;
};

const AccountSetup = (props: ISignupProps) => {
    const { close, logout } = props;
    const [session] = useSession() as ISession;
    const { setUsername: _setUsername } = useAuth();
    const { setNotification } = useNotification();
    const [username, setUsername] = useState<string>('');

    const disabled = () => {
        if (username.length >= 8) {
            return false;
        }
        return true;
    };

    /**
     * Checks for profanity and validates characters / length
     * Creates / updates the username
     */
    const onSubmit = () => {
        if (profanityFilter(username)) {
            return setNotification({
                message: 'Profanity is not allowed!',
                status: 'warning',
                timeout: 7000,
            });
        }
        const { accepted, message } = validateUsername(username);
        if (!accepted) {
            return setNotification({
                message,
                status: 'warning',
                timeout: 7000,
            });
        }
        axios
            .post(`/api/user/username/${session.user.email}`, { username })
            .then((res: AxiosResponse<ICreateUsernameResponse>) => {
                if (res.data.status === 'success') {
                    _setUsername(res.data.username);
                    close();
                }
            })
            .catch((err: AxiosError<ICreateUsernameResponse>) => {
                const message = err.response.data.message;
                if (message) {
                    setNotification({
                        message,
                        status: 'warning',
                    });
                } else {
                    setNotification({ message: err.message, status: 'error' });
                }
            });
    };

    const FORM_HEIGHT = 250;

    return (
        <FormContainer height={FORM_HEIGHT} window={window}>
            <FormContent>
                <>
                    <Typography
                        component={'span'}
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 20,
                        }}
                    >
                        Create a username
                    </Typography>
                    <FormInput
                        title={'Username'}
                        input={username}
                        setInput={setUsername}
                        label={'At least 8 characters. Lowercase only'}
                    />
                    <FormButton
                        disabled={disabled()}
                        onClick={onSubmit}
                        text={'Submit'}
                    />
                    <Link
                        style={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                        onClick={() => logout()}
                    >
                        <Typography component={'span'} style={{ fontSize: 14 }}>
                            Click here to log out
                        </Typography>
                    </Link>
                </>
            </FormContent>
        </FormContainer>
    );
};

export default AccountSetup;
