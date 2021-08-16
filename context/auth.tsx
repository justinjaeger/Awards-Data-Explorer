import React, { useState, useContext } from 'react';
import { IUser } from '../types';
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
    const [s, setState] = useState<IAuthState>(initialAuthState);

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
