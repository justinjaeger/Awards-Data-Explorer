import React, { useState, useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/client';
import { IGetUserResponse } from '../pages/api/user/[email]';
import { ISession, IUser } from '../types';
import { IAuthContext, IAuthState, _void } from './types';

export const initialAuthState: IAuthState = {
    user: undefined,
};

export const initialAuthContext: IAuthContext = {
    ...initialAuthState,
    setUser: _void,
    setImage: _void,
    setUsername: _void,
};

const AuthContext = React.createContext<IAuthContext>(initialAuthContext);

export default function AuthProvider(props: { children: React.ReactChild }) {
    const [session] = useSession() as ISession;
    const [s, setState] = useState<IAuthState>(initialAuthState);

    // IF username is null aka they just signed up, change that
    useEffect(() => {
        // update user data if session found
        if (session) {
            console.log('UPDATING SESSION:');
            const { email } = session.user;
            axios
                .get(`/api/user/${email}`)
                .then((res: AxiosResponse<IGetUserResponse>) => {
                    console.log('LOGGED IN USER:', res.data.user);
                    if (res.data.status === 'success') {
                        setState({
                            ...s,
                            user: res.data.user,
                        });
                    }
                });
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                user: s.user,
                setUser: (user: IUser) =>
                    setState({
                        user,
                    }),
                setUsername: (username: string) =>
                    setState({
                        user: {
                            ...s.user,
                            username,
                        },
                    }),
                setImage: (image: string) =>
                    setState({
                        user: {
                            ...s.user,
                            image,
                        },
                    }),
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
