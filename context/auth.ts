
import React, { useState, useContext } from 'react';
import { 
    IAuthContext, 
    IAuthState, 
    IUser,
} from '../types';

const [state, setState] = useState<IAuthState>({
    token: undefined,
    user: undefined,
});

const AuthContext = React.createContext<IAuthContext>({
    token: undefined,
    user: undefined,
    setImage: (image: string) => setState((s) => ({
        ...s,
        user: {
            ...s.user,
            image
        }
    })),
    setUser: (user: IUser | undefined) => setState((s) => ({
        ...s,
        user,
    })),
});

export const { token, user, setImage, setUser } = useContext(AuthContext);

export default AuthContext;
