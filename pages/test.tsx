import { csrfToken, getCsrfToken, getSession, signIn } from 'next-auth/client';
import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';

interface IHomeProps
    extends InferGetServerSidePropsType<typeof getServerSideProps> {
    example: string;
}

export default function Home(props: IHomeProps) {
    const { session, csrfToken } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    console.log('csftToken', csrfToken);

    const handleSubmit = async (e) => {
        console.log('email', email);
        // const res = await axios.post(`api/auth/signin/email`);
        // console.log('res', res);
        signIn('email', {
            email: 'asdf',
        });
        e.preventDefault(); // prevents it from refreshing
    };

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    return (
        <>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText id="my-helper-text">
                    We'll never share your email.
                </FormHelperText>
            </FormControl>
            <Button onClick={handleSubmit}>Submit form</Button>
        </>
    );
}

interface IServerSideProps {
    session: Session;
    csrfToken: string;
}
export const getServerSideProps: GetServerSideProps<IServerSideProps> = async (
    ctx
) => {
    return {
        props: {
            session: await getSession(ctx),
            csrfToken: await getCsrfToken(ctx),
        },
    };
};
