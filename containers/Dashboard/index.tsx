import React, { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import Modal from '../../components/Modal';
import { useNotification } from '../../context/notification';
import * as SecureServices from '../../services/secure';
import FollowerList from './components/FollowerList';
import { User } from '.prisma/client';

type IDashboardProps = {
    profileUser: User;
    followerCount: number;
    followingCount: number;
    isMyProfile: boolean;
    userIsFollowing: boolean;
    session?: Session;
};

export type IModalType = 'follower' | 'following' | undefined;

const Dashboard = (props: IDashboardProps) => {
    const {
        profileUser,
        followerCount: _followerCount,
        followingCount,
        isMyProfile,
        userIsFollowing: _userIsFollowing,
        session,
    } = props;

    const { setNotification } = useNotification();
    const [dashboardModal, setDashboardModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<IModalType>();
    const [followerCount, setFollowerCount] = useState<number>(_followerCount);
    const [userIsFollowing, setUserIsFollowing] =
        useState<boolean>(_userIsFollowing);
    const [profileImage, setProfileImage] = useState<string>(profileUser.image);

    // console.log('session', session);
    // console.log('profileUser', profileUser);
    console.log('profileImage', profileImage);
    // console.log('followerCount', followerCount);
    // console.log('followingCount', followingCount);
    // console.log('isMyProfile', isMyProfile);
    // console.log('userIsFollowing', userIsFollowing, _userIsFollowing);

    useEffect(() => {
        // idk why but I have to do this again
        // will fix when I create dashbord context
        setUserIsFollowing(_userIsFollowing);
        setProfileImage(profileUser.image);
        setFollowerCount(_followerCount);
    }, [_userIsFollowing, profileUser.image, _followerCount]);

    const setModal = (_modalType: IModalType) => {
        setDashboardModal(true);
        setModalType(_modalType);
    };

    // FOLLOW USER
    // Should we put these follow functions in context maybe?
    const follow = () => {
        SecureServices.follow(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            setUserIsFollowing(true);
            setFollowerCount(followerCount + 1);
        });
    };

    // UNFOLLOW USER
    const unfollow = () => {
        SecureServices.unfollow(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            setUserIsFollowing(false);
            setFollowerCount(followerCount - 1);
        });
    };

    // UPLOAD PROFILE IMAGE
    const handleProfileImageUpload = async (e) => {
        // Create a form with uploaded file in it
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Check that file type is valid
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            return setNotification({
                message: 'Not a valid image type. Accepts .jpeg / .jpg / .png',
                status: 'warning',
            });
        }

        // generate unique new file name
        const fileName = session.user.id + Math.floor(Math.random() * 10000000);

        // Store the previous user image key
        const previousKey = session.user.image.slice(52);

        // Upload the image
        const uploadImageResult = await SecureServices.uploadProfileImage(
            fileName,
            formData
        );

        if (uploadImageResult.status === 'error') {
            return setNotification({
                message: 'Error uploading profile picture.',
                status: 'error',
            });
        }

        // right now, doesn't do anything. idk why
        setProfileImage(uploadImageResult.image);

        // If there was a previous image uploaded, delete that form Spaces/S3
        if (previousKey !== '/PROFILE.png') {
            SecureServices.deleteProfileImage(previousKey).then((res) => {
                if (res.status === 'error') {
                    return setNotification({
                        message: res.message,
                        status: 'error',
                    });
                }
                console.log('deleteProfileImage', res);
            });
        }
    };

    return (
        <div id="dashboard-content">
            {isMyProfile ? (
                <>
                    <label htmlFor="file-upload">
                        <div>
                            {/* <img
                                src={profileUser.image}
                                className="profile-image-lg dashboard-profile-image"
                            /> */}
                            <Image
                                src={profileImage}
                                height={200}
                                width={200}
                            />
                            <div id="dashboard-image-hover">Upload Image</div>
                        </div>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleProfileImageUpload}
                    />
                </>
            ) : (
                <label htmlFor="file-upload">
                    <Image src={profileImage} height={200} width={200} />
                    {/* <img
                        src={profileImage}
                        className="profile-image-lg dashboard-profile-image-logout"
                    /> */}
                </label>
            )}

            <div id="dashboard-info">
                <div id="profile-name">{profileUser.username}</div>

                {session &&
                    (userIsFollowing ? (
                        <button id="follow-button" onClick={unfollow}>
                            Unfollow
                        </button>
                    ) : (
                        !isMyProfile && (
                            <button id="follow-button" onClick={follow}>
                                Follow
                            </button>
                        )
                    ))}

                <div id="dashboard-follower-buttons">
                    <button
                        onClick={() => setModal('follower')}
                        id="follower-button"
                    >
                        {followerCount} followers
                    </button>
                    <button
                        onClick={() => setModal('following')}
                        id="follower-button"
                    >
                        {followingCount} following
                    </button>
                </div>
            </div>

            {dashboardModal && (
                <Modal setModal={setDashboardModal}>
                    <div id="follower-list-container">
                        {modalType === 'follower' && (
                            <div id="follower-title">Followers:</div>
                        )}
                        {modalType === 'following' && (
                            <div id="follower-title">Following:</div>
                        )}
                        <FollowerList
                            modalType={modalType}
                            profileUser={profileUser}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Dashboard;
