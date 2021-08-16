import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../types';

export interface IAppState {
    url: string;
    notification: string | undefined;
}

export interface IAuthState {
    token: string | undefined;
    user: IUser | undefined;
}

export interface IAppContext extends IAppState {
    setNotification: Dispatch<SetStateAction<string | undefined>>;
}

export interface IAuthContext extends IAuthState {
    setUser: Dispatch<SetStateAction<IUser | undefined>>;
    setImage: Dispatch<SetStateAction<string | undefined>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const _void = () => {};
