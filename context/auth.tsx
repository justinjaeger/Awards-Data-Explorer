import { Prisma } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
// import { useSession } from 'next-auth/client';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import prisma from '../lib/prisma';
import { IUploadImageResponse } from '../pages/api/user/[email]';
import { IUser } from '../types';
import { useAsyncEffect } from '../utils/hooks';
import { IAuthContext, IAuthState, _void } from './types';

export const initialAuthState = {
    token: undefined,
    user: undefined,
};

export const initialAuthContext = {
    ...initialAuthState,
    setUser: _void,
    setImage: _void,
};

const AuthContext = React.createContext<IAuthContext>(initialAuthContext);

export default function AuthProvider(props) {
    // const [session, loading] = useSession();
    const [s, setState] = useState<IAuthState>(initialAuthState);

    // console.log('SESSION: ', session, 'loading', loading);

    // useEffect(() => {
    //     // If there's an active session, update state
    //     if (session) {
    //         getUserData();
    //     }
    // }, []);

    // const getUserData = async () => {
    //     const { email } = session.user;
    //     const result: IUploadImageResponse = await axios.get(
    //         `/api/user/${email}`
    //     );
    //     if (result.status === 'success') {
    //         setState({
    //             ...s,
    //             user: result.user,
    //         });
    //     }
    // };

    return (
        <AuthContext.Provider
            value={{
                token: s.token,
                user: s.user,
                setUser: (user: IUser) =>
                    setState({
                        ...s,
                        user,
                    }),
                setImage: (image: string) =>
                    setState({
                        ...s,
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

export const useAuthState = () => useContext(AuthContext);
