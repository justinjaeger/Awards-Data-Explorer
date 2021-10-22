import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/client';
import { ISession } from '../types';
import { useDeepCompareEffect } from '../utils/hooks';
import * as SecureServices from '../services/secure';
import { IAuthContext, IAuthState, _void } from './types';
import { User } from '.prisma/client';

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
    const [user, setUser] = useState<User>();

    useDeepCompareEffect(() => {
        // update user data if session found
        if (session) {
            console.log('UPDATING SESSION...');
            SecureServices.getUser().then((res) => {
                if (res.status === 'error') {
                    console.log('Could not retrieve user session');
                }
                setUser(res.user);
            });
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser: (user) => setUser(user),
                setUsername: (username: string) =>
                    setUser({
                        ...user,
                        username,
                    }),
                setImage: (image: string) =>
                    setUser({
                        ...user,
                        image,
                    }),
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
