import axios, { AxiosResponse, AxiosError } from 'axios';
import { IFollowerCountResponse } from '../pages/api/users/profile/[profileUserId]/followers/count';
import { IGetProfileUserResponse } from '../pages/api/users/[username]';

/**
 * The point of this file is to make sure consistent responses
 * are coming back to the frontend so ideally we don't even need
 * to type the response.
 * Errors for ME are logged in the backend
 * Errors for the USER are passed up to the front and delt with separately
 * ^ can deal with all errors in a "then" block on front
 */

/**
 * At some point, should mandate a token authorization check for each service
 * So long as it is private aka only the user should access
 * Really, this would only apply to post requests so someone can't do anything without the auth token
 * So pass token into the header and check that before sending back data
 * headers: { Authorization: `Token ${token}` }
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
        .get(`/api/users/profile/${profileUserId}/followers/count`)
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
