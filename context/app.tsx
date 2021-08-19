import React, { useState, useContext } from 'react';
import { IAppContext, IAppState, _void } from './types';

const initialAppState = {
    url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003'
            : 'https://www.oscarexpert.com',
    notification: undefined,
};

const initialAppContext = {
    ...initialAppState,
    setNotification: _void,
};

const AppContext = React.createContext<IAppContext>(initialAppContext);

export default function AppProvider(props) {
    const [s, setState] = useState<IAppState>(initialAppState);

    console.log('app', s);

    return (
        <AppContext.Provider
            value={{
                url: s.url,
                notification: s.notification,
                setNotification: (notification: string | undefined) =>
                    setState({ ...s, notification }),
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
export const useAppState = () => useContext(AppContext);
