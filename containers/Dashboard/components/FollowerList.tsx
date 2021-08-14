import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAsyncEffect } from '../../../utils/hooks';
import { IProfileUser, IFollower } from '../../../types';
import Loading from '../../../components/Loading';
import FollowerUnit from './FollowerUnit';

type IFollowerListProps = {
    modalType: 'follower' | 'following';
    profileUser: IProfileUser;
};

export default function FollowerList(props: IFollowerListProps) {
    const { modalType, profileUser } = props;

    const [userList, setUserList] = useState<IFollower[] | undefined>(
        undefined
    );

    useAsyncEffect(async () => {
        if (modalType === 'follower') {
            // Fetch the profile's followers
            await axios
                .get(`/api/v2/users/${profileUser.userId}/followers`)
                .then((res) => {
                    setUserList(res.data.followers);
                })
                .catch((err) => {
                    console.log('something went wrong fetching followers', err);
                });
        }

        if (modalType === 'following') {
            // Fetch who the profile is following
            await axios
                .post(`/api/v2/users/${profileUser.userId}/following`)
                .then((res) => {
                    setUserList(res.data.followers);
                })
                .catch((err) => {
                    console.log(
                        'something went wrong fetching followings',
                        err
                    );
                });
        }
    }, []);

    return (
        <>
            {userList ? (
                <div id="follower-list">
                    {userList.map((follower, i) => (
                        <FollowerUnit
                            follower={follower}
                            key={`${modalType}${i}`}
                        />
                    ))}
                </div>
            ) : (
                <div id="follower-list">
                    <Loading />
                </div>
            )}
        </>
    );
}
