export interface IInitialProps {
    app: IAppState;
    auth: IAuthState;
}

// CONTEXT
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

// TYPES
export interface IUser {
    userId: number;
    username: string;
    email: string;
    admin: boolean,
    image?: string;
}

export type IProfileUser = {
    image: string;
    username: string;
    userId: number | undefined;
    followers: number | undefined;
    following: number | undefined;
};

export type IFollower = {
    userId: number,
    username: string,
    image: string,
};

export type ILoginRoute = 
    'login' | 
    'email' | 
    'signup' | 
    'forgotPassword' |
    'resetPassword' |
    undefined;
