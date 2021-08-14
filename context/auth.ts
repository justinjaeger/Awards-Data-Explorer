import React, { useState, useContext } from 'react';
import { IUser } from '../types';
import { IAuthContext, IAuthState } from './types';

const [s, setState] = useState<IAuthState>({
    token: undefined,
    user: undefined,
});

export const initialAuthContext: IAuthContext = {
    token: undefined,
    user: undefined,
    setImage: (image: string) =>
        setState({
            ...s,
            user: {
                ...s.user,
                image,
            },
        }),
    setUser: (user: IUser | undefined) =>
        setState({
            ...s,
            user,
        }),
};

const AuthContext = React.createContext<IAuthContext>(initialAuthContext);

export const { token, user, setImage, setUser } = useContext(AuthContext);

export default AuthContext;
