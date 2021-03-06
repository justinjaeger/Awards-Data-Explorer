// TYPES
export interface IUser {
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    image: string;
}

export type IProfileUser = {
    image: string;
    username: string;
    userId: number | undefined;
    followers: number | undefined;
    following: number | undefined;
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
    | 'forgotPassword'
    | 'resetPassword'
    | undefined;

export interface IApiResponse {
    status: 'success' | 'rejected' | 'error';
    message?: string;
}
