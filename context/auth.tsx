import React, { useState, useContext } from 'react';
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

const AuthProvider = (props: { children: React.ReactChild }) => {
    const [user, setUser] = useState<User>();

    useDeepCompareEffect(() => {
        SecureServices.getUser().then((res) => setUser(res.user));
    }, [user]);

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
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
