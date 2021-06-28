
import React, { useState } from 'react';
import { IAuthContext, IAppContext, IAuthState } from '../types';

const [state, setState] = useState<IAuthState>({
    token: undefined,
    user: undefined,
});

const AppContext = React.createContext<IAppContext>({ 
    url: '',
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
});

export default { Auth: AuthContext, App: AppContext };