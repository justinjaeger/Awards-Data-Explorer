import { IUser, IFollower } from './';

/**
 * status: 'rejected' is a controlled error
 * ex: 'username not long enough'
 */

export interface IGenericResponse {
    status: 'success' | 'rejected' | 'error';
    message?: string;
}

export interface ILoginResponse extends IGenericResponse {
    user?: IUser;
}

export interface ISignupStepOneResponse extends IGenericResponse {
    userId?: number;
}

export interface IProfileUserResponse extends IGenericResponse {
    userId?: number;
    image?: string;
}

export interface IFollowerCountResponse extends IGenericResponse {
    count?: number;
}

export interface IFollowerResponse extends IGenericResponse {
    followers?: IFollower[];
}

export interface IDetermineFollowingResponse extends IGenericResponse {
    following?: boolean;
}

export interface IVerifyCodeResponse extends IGenericResponse {
    userId?: number;
}

export interface IUploadImageResponse extends IGenericResponse {
    url?: string;
}
