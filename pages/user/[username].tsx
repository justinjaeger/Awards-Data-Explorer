import { Agent } from 'http';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useAsyncEffect } from '../../utils/hooks';
import Dashboard from '../../containers/Dashboard';
import NotFound from '../../containers/NotFound';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/auth';
import { IProfileUser, ISession } from '../../types';
import { useNotification } from '../../context/notification';
import * as Services from '../../services';
import prisma from '../../lib/prisma';
import { User } from '.prisma/client';

interface IUserDashboardServerSideProps {
    notFound?: boolean;
    profileUser?: User;
}

const UserDashboard = (props: IUserDashboardServerSideProps) => {
    const { notFound, profileUser } = props;
    const [session] = useSession() as ISession;
    const { user } = useAuth();
    const { setNotification } = useNotification();
    const [_404, set404] = useState<boolean>(false);
    const [followingProfile, setFollowingProfile] = useState<boolean>(false);
    const [followerCount, setFollowerCount] = useState<number>();
    const [followingCount, setFollowingCount] = useState<number>();

    useAsyncEffect(async () => {
        // if we are not logged in, don't need to get following relatinoship
        if (!user || !profileUser) return;

        // GET PROFILE FOLLOWER COUNT
        Services.getProfileFollowerCount(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            console.log('Follower Count', res.count);
            setFollowerCount(res.count);
        });

        // GET PROFILE FOLLOWING COUNT
        Services.getProfileFollowingCount(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            console.log('Following Count', res.count);
            setFollowingCount(res.count);
        });

        // If not our profile, determine if we are following this profile
        if (profileUser.id !== user.id) {
            Services.checkIfFollowing(profileUser.username, user.id).then(
                (res) => {
                    if (res.status === 'error') {
                        return setNotification({
                            message: res.message,
                            status: 'error',
                        });
                    }
                    setFollowingProfile(res.following);
                }
            );
        }
    }, [user]);

    return (
        <>
            {notFound && <NotFound thingCannotFind="User" />}
            {profileUser && followerCount && followingCount ? (
                <></>
            ) : (
                // <Dashboard
                //     profileUser={profileUser}
                //     followingProfile={followingProfile}
                //     followerCount={followerCount}
                //     followingCount={followingCount}
                // />
                <Loading />
            )}
        </>
    );
};

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IUserDashboardServerSideProps>> {
    const profileUsername = context.query.username as string;

    const response = await prisma.user.findUnique({
        where: {
            username: profileUsername,
        },
        rejectOnNotFound: true,
    });
    if (!response) {
        return {
            props: { notFound: true },
        };
    }
    return {
        props: {
            profileUser: JSON.parse(JSON.stringify(response)),
        },
    };
}

export default UserDashboard;
