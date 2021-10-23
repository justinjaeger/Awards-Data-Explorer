import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import { IModalType } from '..';
import * as Service from '../../../services';
import { useNotification } from '../../../context/notification';
import FollowerUnit from './FollowerUnit';
import { User } from '.prisma/client';

type IFollowerListProps = {
    modalType: IModalType;
    profileUser: User;
};

/**
 * WARNING: This data is regenerating every time the modal pops up.
 * We should have this in some sort of context.
 * Actually, the whole user dashboard should be in a context
 */
const FollowerList = (props: IFollowerListProps) => {
    const { modalType, profileUser } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const { setNotification } = useNotification();

    const [userList, setUserList] = useState<User[]>(undefined);

    useEffect(() => {
        // Fetch profile's followers
        if (modalType === 'follower') {
            Service.getFollowers(profileUser.id).then((res) => {
                if (res.status === 'error') {
                    return setNotification({
                        status: 'error',
                        message: res.message,
                    });
                }
                setUserList(res.followers);
                setLoading(false);
            });
        }

        // Fetch who profile follows
        if (modalType === 'following') {
            Service.getFollowings(profileUser.id).then((res) => {
                if (res.status === 'error') {
                    return setNotification({
                        status: 'error',
                        message: res.message,
                    });
                }
                setUserList(res.followers);
                setLoading(false);
            });
        }
    }, []);

    // There must be some library that automatically lazily loads a list...
    // https://www.youtube.com/watch?v=G7_0VxMRJe4
    if (loading) return <Loading />;
    return (
        <div id="follower-list">
            {userList.map((follower, i) => (
                <FollowerUnit follower={follower} key={`${modalType}${i}`} />
            ))}
        </div>
    );
};

export default FollowerList;
