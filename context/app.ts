
import React, { useState, useContext } from 'react';
import { IAppContext, IAppState } from '../types';

const [state, setState] = useState<IAppState>({
    url: '',
    notification: undefined,
});

const AppContext = React.createContext<IAppContext>({ 
    url: '',
    notification: undefined,
    setNotification: (notification: string) => setState((s) => ({
        ...s,
        notification,
    }))
});

export const { url, notification, setNotification } = useContext(AppContext);

export default AppContext;
