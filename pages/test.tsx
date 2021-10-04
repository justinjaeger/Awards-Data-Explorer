import { getSession, signIn, SignInResponse } from 'next-auth/client';
import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { IApiResponse } from '../types';
import { useNotification } from '../context/notification';
interface IHomeProps
    extends InferGetServerSidePropsType<typeof getServerSideProps> {
    example: string;
}

export default function Home(props: IHomeProps) {
    const { session } = props;
    const { setNotification } = useNotification();
    const [email, setEmail] = useState<string>('');

    /**
     * Potentially, you could just sign UP this manually. Create a new user in the database and await it.
     * Then, at the end, you call the signIn function.
     * However, every time they want to sign in they need to go to their email
     * We can worry about this later because most people might prefer to use google oauth anyway
     * And this is a good option for password reset
     * Probably a good plan so should set up SMTP provider
     */

    const handleSignIn = async () => {
        // sends email to this address if valid account (so long as you provide email)
        // can potentially wrap this and check for other things before submitting request
        console.log('email signIn', email);
        signIn('email', {
            email: 'jjustinjaeger@gmail.com', // change back to email
            callbackUrl: 'http://localhost:3003/test',
            redirect: false,
        })
            .then((res: SignInResponse) => {
                console.log('resssssssssssssss', res);
            })
            .catch((err) => {
                console.log('errrrrrrrrrrrrrrrr', err);
            });
    };

    const handleSignUp = async () => {
        console.log('email signUp', email);
        await axios
            .post('api/user', {
                email,
            })
            .then((res: AxiosResponse<IApiResponse>) => {
                if (res.data.status === 'success') {
                    handleSignIn();
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
        // sends email to this address if valid account (so long as you provide email)
        // can potentially wrap this and check for other things before submitting request
    };

    return (
        <>
            {session ? (
                <div>You are logged in</div>
            ) : (
                <div>You are NOT logged in</div>
            )}
            <div style={{ marginTop: 100 }}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText>
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <Button disabled={email.length === 0} onClick={handleSignIn}>
                    SIGN IN
                </Button>
            </div>
            <div style={{ marginTop: 100 }}>
                <Button disabled={email.length === 0} onClick={handleSignUp}>
                    SIGN UP
                </Button>
            </div>
            <Button onClick={() => setNotification('hello')}>
                NOTIFICATION
            </Button>
        </>
    );
}

interface IServerSideProps {
    session: Session;
}
export const getServerSideProps: GetServerSideProps<IServerSideProps> = async (
    ctx
) => {
    return {
        props: {
            session: await getSession(ctx),
        },
    };
};
