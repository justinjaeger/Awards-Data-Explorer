import React, { useState, useContext } from 'react';
import Notification from '../components/Notification';
import { INotification, INotificationContext, _void } from './types';

const initialNotification = {
    message: undefined,
    status: undefined,
    timeout: undefined,
};

const initialNotificationState = {
    notification: initialNotification,
};

const initialNotificationContext = {
    ...initialNotificationState,
    setNotification: _void,
};

const NotificationContext = React.createContext<INotificationContext>(
    initialNotificationContext
);

export default function AppProvider(props) {
    const [notification, setNotification] =
        useState<INotification>(initialNotification);

    const { message, timeout, status } = notification;

    return (
        <NotificationContext.Provider
            value={{
                notification,
                setNotification: (n: INotification) =>
                    setNotification({ ...n }),
            }}
        >
            <Notification message={message} timeout={timeout} status={status} />
            {props.children}
        </NotificationContext.Provider>
    );
}
export const useNotification = () => useContext(NotificationContext);
