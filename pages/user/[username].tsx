import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Router from 'next/router';
import { useAsyncDeepCompareEffect } from '../../utils/hooks';
import Dashboard from '../../containers/Dashboard';
import Loading from '../../components/Loading';
import { useNotification } from '../../context/notification';
import * as Services from '../../services';
import * as SecureServices from '../../services/secure';
import Prisma from '../../lib/prisma';
import { useAuth } from '../../context/auth';
import { User } from '.prisma/client';

interface IUserDashboardServerSideProps {
    profileUser?: User;
    notFound?: boolean;
}

const UserDashboard = (props: IUserDashboardServerSideProps) => {
    const { profileUser, notFound } = props;
    const { user } = useAuth();
    const { setNotification } = useNotification();
    const [followerCount, setFollowerCount] = useState<number>();
    const [followingCount, setFollowingCount] = useState<number>();
    const [userIsFollowing, setUserIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (notFound) {
            setNotification({
                status: 'warning',
                message: 'User not found.',
            });
            Router.push('/');
        }
    }, [notFound]);

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
            user && profileUser.id !== user.id
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
    }, [user]);

    if (loading) return <Loading />;
    return (
        <Dashboard
            profileUser={profileUser}
            followerCount={followerCount}
            followingCount={followingCount}
            isMyProfile={user && profileUser.id === user.id}
            userIsFollowing={userIsFollowing}
        />
    );
};

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IUserDashboardServerSideProps>> {
    const profileUsername = context.query.username as string;

    const response = await Prisma.User.user.findUnique({
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
