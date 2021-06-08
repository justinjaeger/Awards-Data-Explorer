export type IUser = {
    userId: string;
    username: string;
    email: string;
    image?: string;
    admin: boolean,
} | null;

export type ILoginRoute = 
    '' |
    'login' | 
    'email' | 
    'signup' | 
    'forgotPassword' |
    'resetPassword';

/**
 * Rejected is a controlled error
 * ex: username not long enough
 */
export interface IGenericResponse {
    status: 'success' | 'rejected' | 'error';
    message?: string;
}

export interface ILoginResponse extends IGenericResponse {
    user?: IUser,
}

export interface ISignupStepOneResponse extends IGenericResponse {
    userId: number,
}