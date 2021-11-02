import React, { useState } from 'react';
import { Link, Typography } from '@mui/material';
import FormInput from '../../../components/UI/FormInput';
import FormButton from '../../../components/UI/FormButton';
import { useNotification } from '../../../context/notification';
import { useAuth } from '../../../context/auth';
import { profanityFilter, validateUsername } from '../../../utils/Filter';
import * as SecureServices from '../../../services/secure';
import { FormContainer, FormContent } from './styles';

type ISignupProps = {
    close: () => void;
    logout: () => void;
};

const AccountSetup = (props: ISignupProps) => {
    const { close, logout } = props;
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
        SecureServices.createUsername(username).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            if (res.status === 'rejected') {
                return setNotification({
                    message: res.message,
                    status: 'warning',
                });
            }
            _setUsername(res.username);
            close();
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
