import axios, { AxiosResponse, AxiosError } from 'axios';
import { IFollowerResponse } from '../pages/api/users/profile/[profileUserId]/follower';
import { IFollowerCountResponse } from '../pages/api/users/profile/[profileUserId]/follower/count';
import { IFollowingResponse } from '../pages/api/users/profile/[profileUserId]/following';
import { IGetProfileUserResponse } from '../pages/api/users/[username]';

/**
 * The point of this file is to make sure consistent responses
 * are coming back to the frontend so ideally we don't even need
 * to type the response.
 * Errors for ME are logged in the backend
 * Errors for the USER are passed up to the front and delt with separately
 * ^ can deal with all errors in a "then" block on front
 */

export const getProfileUser = (
    profileUsername: string
): Promise<IGetProfileUserResponse> => {
    return axios
        .get(`/api/users/${profileUsername}`)
        .then((res: AxiosResponse<IGetProfileUserResponse>) => res.data)
        .catch((err: AxiosError<IGetProfileUserResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const getProfileFollowerCount = (
    profileUserId: string
): Promise<IFollowerCountResponse> => {
    return axios
        .get(`/api/users/profile/${profileUserId}/follower/count`)
        .then((res: AxiosResponse<IFollowerCountResponse>) => res.data)
        .catch((err: AxiosError<IFollowerCountResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const getProfileFollowingCount = (
    profileUserId: string
): Promise<IFollowerCountResponse> => {
    return axios
        .get(`/api/users/profile/${profileUserId}/following/count`)
        .then((res: AxiosResponse<IFollowerCountResponse>) => res.data)
        .catch((err: AxiosError<IFollowerCountResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const getFollowers = (
    profileUserId: string
): Promise<IFollowerResponse> => {
    return axios
        .get(`/api/users/profile/${profileUserId}/follower`)
        .then((res: AxiosResponse<IFollowerResponse>) => res.data)
        .catch((err: AxiosError<IFollowerResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};

export const getFollowings = (
    profileUserId: string
): Promise<IFollowingResponse> => {
    return axios
        .get(`/api/users/profile/${profileUserId}/following`)
        .then((res: AxiosResponse<IFollowingResponse>) => res.data)
        .catch((err: AxiosError<IFollowingResponse>) => {
            if (err.response.status === 404)
                return { status: 'error', message: 'A 404 error has occured' };
            return err.response.data;
        });
};
