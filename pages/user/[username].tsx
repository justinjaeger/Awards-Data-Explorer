import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAsyncEffect } from '../../utils/hooks';
import axios, { AxiosResponse } from "axios";
import Dashboard from '../../containers/Dashboard';
import NotFound from '../../containers/NotFound';
import Loading from '../../components/Loading';
import { user } from '../../context/auth';
import { IProfileUser } from '../../types';
import { 
    IProfileUserResponse, 
    IFollowerCountResponse,
    IDetermineFollowingResponse,
} from '../../types/responses';
import { setNotification } from '../../context/app';

/**
 * A lot of these components (like this one) don't need to render separate components
 */

export default function UserDashboard() {

    const router = useRouter();
    const profileUsername = router.query.username;

    const [_404, set404] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [profileUser, setProfileUser] = useState<IProfileUser | undefined>(undefined);
    const [following, setFollowing] = useState<boolean>(false); // true is user is following this profile

    useAsyncEffect(async () => {
        // Fetch the data of the profile
        // I wonder if this is better in a non-try catch
        // It may actually not catch the errors in here due to a bug (saw on GitHub)

        // This is a bad solution because we're fetching BEFORE we know the profileUser data
        // We need to get the username from the query and fetch all the info about that user and pass it in
        // But to setProfileUser it has to reload again so it would be a double fetch or something
        try {
            // GET PROFILE IMAGE
            const profileImageResponse: AxiosResponse<IProfileUserResponse> = await axios.get(
                `/api/v2/users/image/profile/${profileUsername}`,
            );
            if (profileImageResponse.data.status === 'error') {
                throw new Error(profileImageResponse.data.message);
            }
            if (profileImageResponse.data.status === 'rejected') {
                setLoading(false);
                return set404(true);
            }
            const { userId, image } = profileImageResponse.data;

            // GET PROFILE FOLLOWER COUNT
            const followerCountResponse: AxiosResponse<IFollowerCountResponse> = await axios.get(
                `api/v2/users/${userId}/followers/count`
            );
            if (followerCountResponse.data.status === 'error') {
                throw new Error(followerCountResponse.data.message);
            };
            const { count: followers } = followerCountResponse.data;
            
            // GET PROFILE FOLLOWING COUNT
            const followingCountResponse: AxiosResponse<IFollowerCountResponse> = await axios.get(
                `api/v2/users/${userId}/followers/count`
            );
            if (followingCountResponse.data.status === 'error') {
                throw new Error(followingCountResponse.data.message);
            };
            const { count: following } = followingCountResponse.data;

            setProfileUser({
                image: image || '/PROFILE.png',
                userId,
                username: profileUser.username,
                followers,
                following,
            });

            // If this is not our profile, determine if we are following them
            if (user && user.username !== profileUsername) {
                const determineFollowingResponse: AxiosResponse<IDetermineFollowingResponse> = await axios.get(
                    `/api/v2/users/${user.userId}/following/${userId}`
                );
                if (determineFollowingResponse.data.status === 'error') {
                    throw new Error(determineFollowingResponse.data.message);
                };
                const { following: _following } = determineFollowingResponse.data;
                setFollowing(_following);
            }

            setLoading(false);
        } catch(e) {
            setNotification(e.message);
            console.error('error in [username].tsx', e.message);
        };
    }, []);

    return (
        <>
        {
            loading 
                ? <Loading />
                : _404 ? (
                    <NotFound thingCannotFind={"User"} />
                ) : (
                    <Dashboard
                        profileUser={profileUser}
                        following={following}
                    />
                )
        }
        </>
    );
}
