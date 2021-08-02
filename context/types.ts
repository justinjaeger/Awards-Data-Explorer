import { IUser } from '../types';

export interface IAppState {
    url: string;
    notification: string | undefined;
}

export interface IAuthState {
    token: string | undefined;
    user: IUser | undefined;
}

export type IAppContext = IAppState & {
    setNotification: (notification: string) => void;
}

export type IAuthContext = IAuthState & {
    setUser: (user: IUser) => void;
    setImage: (image: string) => void;
}
