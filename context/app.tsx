import React, { useState, useContext } from 'react';
import { IAppContext, IAppState, _void } from './types';

export const initialAppState = {
    url: '',
    notification: undefined,
};

export const initialAppContext = {
    ...initialAppState,
    setNotification: _void,
};

const AppContext = React.createContext<IAppContext>(initialAppContext);

export default function AppProvider(props) {
    const [s, setState] = useState<IAppState>(initialAppState);

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
