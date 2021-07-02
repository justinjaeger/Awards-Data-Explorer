
import React, { useState } from 'react';
import { 
    IAuthContext, 
    IAppContext, 
    IAuthState, 
    IUser,
} from '../types';

const [state, setState] = useState<IAuthState>({
    token: undefined,
    user: undefined,
});

const AppContext = React.createContext<IAppContext>({ 
    url: '',
    notification: '',
    setNotification: (notification: string) => setState((s) => ({
        ...s,
        notification,
    }))
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

export default { Auth: AuthContext, App: AppContext };