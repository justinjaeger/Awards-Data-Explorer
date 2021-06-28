export interface IInitialProps {
    app: IAppContext;
    auth: IAuthState;
}

export type IAppContext = {
    url: string;
}

export interface IAuthState {
    token: string | undefined;
    user: IUser | undefined;
}

export type IAuthContext = IAuthState & {
    setImage: (image: string) => void;
}

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

export type IFollowers = {
    userId: number,
    username: string,
    image: string,
}[];

export type ILoginRoute = 
    '' |
    'login' | 
    'email' | 
    'signup' | 
    'forgotPassword' |
    'resetPassword';
