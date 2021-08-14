import React, { useState, useContext } from 'react';
import { IAppContext, IAppState } from './types';

const [s, setState] = useState<IAppState>({
    url: '',
    notification: undefined,
});

export const initialAppState: IAppContext = {
    url: '',
    notification: undefined,
    setNotification: (notification: string) =>
        setState({
            ...s,
            notification,
        }),
};

const AppContext = React.createContext<IAppContext>(initialAppState);

export const { url, notification, setNotification } = useContext(AppContext);

export default AppContext;
