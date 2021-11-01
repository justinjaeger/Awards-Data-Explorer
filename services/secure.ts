import axios, { AxiosResponse, AxiosError } from 'axios';
import { IGetUserResponse } from '../pages/api/user';
import { IFollow } from '../pages/api/user/follow/[targetUserId]';
import { ICheckIfFollowing } from '../pages/api/user/following/[profileUserId]';
import { IDeleteProfileImage } from '../pages/api/user/image/delete';
import { IUploadProfileImage } from '../pages/api/user/image/upload/[fileName]';
import { ICreateUsernameResponse } from '../pages/api/user/username';

/**
 * These api routes use getSession() or getToken()
 * to verify the user
 */

// get all available use information (used in auth context)
export const getUser = (): Promise<IGetUserResponse> => {
    return axios
        .get(`/api/user`)
        .then((res: AxiosResponse<IGetUserResponse>) => res.data)
        .catch((err: AxiosError<IGetUserResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

// create username
export const createUsername = (
    username: string
): Promise<ICreateUsernameResponse> => {
    return axios
        .post(`/api/user/username`, { username })
        .then((res: AxiosResponse<ICreateUsernameResponse>) => res.data)
        .catch((err: AxiosError<ICreateUsernameResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

// determine if the user (id) is following the profile (profileUserId)
export const checkIfFollowing = (
    profileUserId: string
): Promise<ICheckIfFollowing> => {
    return axios
        .get(`/api/user/following/${profileUserId}`)
        .then((res: AxiosResponse<ICheckIfFollowing>) => res.data)
        .catch((err: AxiosError<ICheckIfFollowing>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const follow = (targetUserId: string): Promise<IFollow> => {
    return axios
        .post(`/api/user/follow/${targetUserId}`)
        .then((res: AxiosResponse<IFollow>) => res.data)
        .catch((err: AxiosError<IFollow>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const unfollow = (targetUserId: string): Promise<IFollow> => {
    return axios
        .delete(`/api/user/follow/${targetUserId}`)
        .then((res: AxiosResponse<IFollow>) => res.data)
        .catch((err: AxiosError<IFollow>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

// upload profile image to S3 / spaces
export const uploadProfileImage = (
    fileName: string,
    formData: FormData
): Promise<IUploadProfileImage> => {
    return axios
        .post(`/api/user/image/upload/${fileName}`, formData) // MUST pass formData like this
        .then((res: AxiosResponse<IUploadProfileImage>) => res.data)
        .catch((err: AxiosError<IUploadProfileImage>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

// delete profile image from S3 / spaces
export const deleteProfileImage = (
    fileName: string
): Promise<IDeleteProfileImage> => {
    return axios
        .post(`/api/user/image/delete`, {
            fileName,
        })
        .then((res: AxiosResponse<IDeleteProfileImage>) => res.data)
        .catch((err: AxiosError<IDeleteProfileImage>) => {
            if (err.response.status === 404)
                return {
                    status: 'error',
                    message: 'A 404 error has occured',
                };
            return err.response.data;
        });
};
