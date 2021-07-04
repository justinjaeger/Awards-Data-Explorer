import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useAsyncEffect } from '../../utils/hooks';
import axios, { AxiosResponse } from "axios";
import Dashboard from '../../containers/Dashboard';
import Four0Four from '../../containers/Four0Four';
import Loading from '../../components/Loading';
import Context from '../../context/auth';
import { IProfileUser } from '../../types';
import { 
    IProfileUserResponse, 
    IFollowerCountResponse,
    IDetermineFollowingResponse,
} from '../../types/responses';

/**
 * A lot of these components (like this one) don't need to render separate components
 */

export default function UserDashboard() {

    const router = useRouter();
    const { user } = useContext(Context.Auth);
    const profileUsername = router.query.username;

    const [_404, set404] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [profileUser, setProfileUser] = useState<IProfileUser>({
        image: '/PROFILE.png',
        userId: undefined,
        username: profileUsername as string, // watch out for this
        followers: undefined,
        following: undefined,
    });
    const [following, setFollowing] = useState<boolean>(false); // are we following this user?

    useAsyncEffect(async () => {
        // Fetch the data of the profile
        // I wonder if this is better in a non-try catch
        // It may actually not catch the errors in here due ot a bug (saw on GitHub)
        try {
            // GET PROFILE IMAGE
            const profileImageResponse: AxiosResponse<IProfileUserResponse> = await axios.get(
                `/api/users/image/profile/${profileUsername}`,
            );
            if (profileImageResponse.data.status === 'error') {
                throw new Error(profileImageResponse.data.message);
            }
            if (profileImageResponse.data.status === 'rejected') {
                return set404(true);
            }
            const { userId, image } = profileImageResponse.data;

            // GET PROFILE FOLLOWER COUNT
            const followerCountResponse: AxiosResponse<IFollowerCountResponse> = await axios.get(
                `api/users/${profileUser.userId}/followers/count`
            );
            if (followerCountResponse.data.status === 'error') {
                throw new Error(followerCountResponse.data.message);
            };
            const { count: followers } = followerCountResponse.data;
            
            // GET PROFILE FOLLOWING COUNT
            const followingCountResponse: AxiosResponse<IFollowerCountResponse> = await axios.get(
                `api/users/${profileUser.userId}/followers/count`
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
                    `/api/users/${user.userId}/following/${userId}`
                );
                if (determineFollowingResponse.data.status === 'error') {
                    throw new Error(determineFollowingResponse.data.message);
                };
                const { following: _following } = determineFollowingResponse.data;
                setFollowing(_following);
            }

            setLoading(false);
        } catch(e) {
            console.error('error in [username].tsx', e.message);
            // do something else?
        };
    }, []);

    return (
        <>
        {
            loading 
                ? <Loading />
                : _404 ? (
                    <Four0Four thingCannotFind={"User"} />
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
