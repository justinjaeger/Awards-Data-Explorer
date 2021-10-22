import { Session } from 'next-auth';

export type IProfileUser = {
    username: string;
    id?: string;
    image?: string;
    followers?: number;
    following?: number;
};

export type IFollower = {
    id: number;
    username: string;
    image: string;
};

export type ILoginRoute =
    | 'login'
    | 'email'
    | 'signup'
    | 'forgot_password'
    | 'reset_password'
    | 'account_setup'
    | undefined;

export interface IApiResponse {
    status: 'success' | 'rejected' | 'error';
    message?: string;
}

export type ISession = [Session | null, boolean];
