import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../types';

export type INotification = {
    message: string;
    status?: 'success' | 'warning' | 'error';
    timeout?: number;
};

// NOTIFICATION
export interface INotificationState {
    notification: INotification;
}
export interface INotificationContext extends INotificationState {
    setNotification: Dispatch<SetStateAction<INotification | undefined>>;
}

// AUTH CONTEXT
export interface IAuthState {
    user: IUser | undefined;
}
export interface IAuthContext extends IAuthState {
    setUser: Dispatch<SetStateAction<IUser | undefined>>;
    setImage: Dispatch<SetStateAction<string | undefined>>;
    setUsername: Dispatch<SetStateAction<string | undefined>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const _void = () => {};
