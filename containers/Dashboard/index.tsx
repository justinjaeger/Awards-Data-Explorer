import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/auth';
import { useNotification } from '../../context/notification';
import * as SecureSevices from '../../services/secure';
import FollowerList from './components/FollowerList';
import { User } from '.prisma/client';

type IDashboardProps = {
    profileUser: User;
    followingProfile: boolean;
    followerCount: number;
    followingCount: number;
};

type IModalType = 'follower' | 'following' | undefined;

export default function Dashboard(props: IDashboardProps) {
    const {
        profileUser,
        followingProfile,
        followerCount: _followerCount,
        followingCount,
    } = props;
    const { user } = useAuth();
    const { setNotification } = useNotification();

    const [dashboardModal, setDashboardModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<IModalType>(undefined);
    // Need below in state because we could choose to unfollow
    // ACTUALLY these should probably be updated automatically? idk. maybe not
    const [following, setFollowing] = useState<boolean>(followingProfile);
    const [followerCount, setFollowerCount] = useState<number>(_followerCount);
    const [profileImage, setProfileImage] = useState<string>(profileUser.image);

    // Determine if page is YOUR profile or someone else's
    const isMyProfile = user.username === profileUser.username;

    function setModal(_modalType: IModalType) {
        setDashboardModal(true);
        setModalType(_modalType);
    }

    // FOLLOW USER
    // Should we put these follow functions in context maybe?
    const follow = () => {
        SecureSevices.follow(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            setFollowing(true);
            setFollowerCount(followerCount + 1);
        });
    };

    // UNFOLLOW USER
    const unfollow = () => {
        SecureSevices.unfollow(profileUser.id).then((res) => {
            if (res.status === 'error') {
                return setNotification({
                    message: res.message,
                    status: 'error',
                });
            }
            setFollowing(false);
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
        const fileName = user.id + Math.floor(Math.random() * 10000000);

        // Store the previous user image key
        const previousKey = user.image.slice(52);

        // Upload the image
        const uploadImageResult = await SecureSevices.uploadProfileImage(
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
            SecureSevices.deleteProfileImage(previousKey).then((res) => {
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

    // Load the skeleton until the data has been fetched
    return (
        <div id="dashboard-content">
            {isMyProfile ? (
                <>
                    <label htmlFor="file-upload">
                        <div>
                            <img
                                src={profileUser.image}
                                className="profile-image-lg dashboard-profile-image"
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
                    <img
                        src={profileImage}
                        className="profile-image-lg dashboard-profile-image-logout"
                    />
                </label>
            )}

            <div id="dashboard-info">
                <div id="profile-name">{profileUser.username}</div>
                {!isMyProfile &&
                user &&
                // If someone else's profile AND logged in, display follow/unfollow buttons
                following ? (
                    <button id="follow-button" onClick={unfollow}>
                        Unfollow
                    </button>
                ) : (
                    <button id="follow-button" onClick={follow}>
                        Follow
                    </button>
                )}

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
}
