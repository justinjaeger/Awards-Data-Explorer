import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useAsyncDeepCompareEffect } from '../../utils/hooks';
import Dashboard from '../../containers/Dashboard';
import NotFound from '../../containers/NotFound';
import Loading from '../../components/Loading';
import { useNotification } from '../../context/notification';
import * as Services from '../../services';
import * as SecureServices from '../../services/secure';
import prisma from '../../lib/prisma';
import { User } from '.prisma/client';

interface IUserDashboardServerSideProps {
    notFound?: boolean;
    profileUser?: User;
}

const UserDashboard = (props: IUserDashboardServerSideProps) => {
    const { notFound, profileUser } = props;
    const [session] = useSession();
    const { setNotification } = useNotification();
    const [followerCount, setFollowerCount] = useState<number>();
    const [followingCount, setFollowingCount] = useState<number>();
    const [userIsFollowing, setUserIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useAsyncDeepCompareEffect(async () => {
        if (notFound) return;

        // GET PROFILE FOLLOWER COUNT
        const promise1 = Services.getProfileFollowerCount(profileUser.id).then(
            (res) => {
                if (res.status === 'error') {
                    return setNotification({
                        message: res.message,
                        status: 'error',
                    });
                }
                setFollowerCount(res.count);
            }
        );

        // GET PROFILE FOLLOWING COUNT
        const promise2 = Services.getProfileFollowingCount(profileUser.id).then(
            (res) => {
                if (res.status === 'error') {
                    return setNotification({
                        message: res.message,
                        status: 'error',
                    });
                }
                setFollowingCount(res.count);
            }
        );

        // DETERMINE IF LOGGED IN USER IS FOLLOWING THIS PROFILE
        const promise3 =
            session && profileUser.id !== session.user.id
                ? SecureServices.checkIfFollowing(profileUser.id).then(
                      (res) => {
                          if (res.status === 'error') {
                              return setNotification({
                                  message: res.message,
                                  status: 'error',
                              });
                          }
                          setUserIsFollowing(res.following);
                      }
                  )
                : false;

        await Promise.allSettled([promise1, promise2, promise3]).then(() =>
            setLoading(false)
        );
    }, [session]);

    if (notFound) return <NotFound thingCannotFind="User" />;
    if (loading) return <Loading />;
    return (
        <Dashboard
            profileUser={profileUser}
            followerCount={followerCount}
            followingCount={followingCount}
            isMyProfile={session && profileUser.id === session.user.id}
            userIsFollowing={userIsFollowing}
            session={session}
        />
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
