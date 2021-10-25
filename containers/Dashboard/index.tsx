import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Modal, Typography } from '@mui/material';
import { useNotification } from '../../context/notification';
import * as SecureServices from '../../services/secure';
import FollowButton from '../../components/UI/FollowButton';
import { useAuth } from '../../context/auth';
import FollowerList from './components/FollowerList';
import { DashboardModalContainer } from './styles';
import { User } from '.prisma/client';

type IDashboardProps = {
    profileUser: User;
    followerCount: number;
    followingCount: number;
    isMyProfile: boolean;
    userIsFollowing: boolean;
};

export type IModalType = 'follower' | 'following' | undefined;

const PROFILE_PIC_DIAMETER = 200;

const Dashboard = (props: IDashboardProps) => {
    const {
        profileUser,
        followerCount: _followerCount,
        followingCount,
        isMyProfile,
        userIsFollowing: _userIsFollowing,
    } = props;

    const { setNotification } = useNotification();
    const { user } = useAuth();
    const [dashboardModal, setDashboardModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<IModalType>();
    const [followerCount, setFollowerCount] = useState<number>(_followerCount);
    const [userIsFollowing, setUserIsFollowing] =
        useState<boolean>(_userIsFollowing);
    const [profileImage, setProfileImage] = useState<string>(profileUser.image);

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
    const handleProfileImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log('uploading profile pic');
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

        // Store the previous user image + key
        const previousImage = user.image;
        const previousKey = user.image.slice(52);

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
        if (previousImage !== '/PROFILE.png') {
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

    const ProfileImageMyProfile = () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ padding: 10 }}>
                <Image
                    src={profileImage}
                    height={PROFILE_PIC_DIAMETER}
                    width={PROFILE_PIC_DIAMETER}
                    className={'dashboard-profile-image-my-profile'}
                />
            </div>
            <div>
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <CloudUploadIcon style={{ marginRight: 10 }} />
                        <Typography>Change Picture</Typography>
                    </div>
                </label>
                <input
                    id="file-upload"
                    name="logo"
                    type="file"
                    onChange={(e) => handleProfileImageUpload(e)}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );

    const ProfileImage = () => (
        <div style={{ padding: 10 }}>
            <Image
                src={profileImage}
                height={PROFILE_PIC_DIAMETER}
                width={PROFILE_PIC_DIAMETER}
                className={'profile-image'}
            />
        </div>
    );

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {isMyProfile ? <ProfileImageMyProfile /> : <ProfileImage />}

            <div style={{ position: 'absolute', marginLeft: 220 }}>
                <Typography
                    style={{
                        display: 'inline-block',
                        alignItems: 'baseline',
                        margin: 10,
                        marginRight: 30,
                        fontSize: 36,
                    }}
                    component={'span'}
                >
                    {profileUser.username}
                </Typography>

                {user &&
                    (userIsFollowing ? (
                        <FollowButton onClick={unfollow} text={'Unfollow'} />
                    ) : (
                        !isMyProfile && (
                            <FollowButton onClick={follow} text={'Follow'} />
                        )
                    ))}

                <div style={{ display: 'flex' }}>
                    <FollowButton
                        onClick={() => setModal('follower')}
                        text={followerCount + ' followers'}
                    />
                    <FollowButton
                        onClick={() => setModal('following')}
                        text={followingCount + ' following'}
                    />
                </div>
            </div>

            {dashboardModal && (
                <Modal
                    open={dashboardModal}
                    onClose={() => setDashboardModal(false)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <DashboardModalContainer window={window}>
                        <Typography
                            component={'span'}
                            style={{ padding: 20, width: '100%' }}
                        >
                            {modalType === 'follower' && 'Followers:'}
                            {modalType === 'following' && 'Following:'}
                            <FollowerList
                                modalType={modalType}
                                profileUser={profileUser}
                            />
                        </Typography>
                    </DashboardModalContainer>
                </Modal>
            )}
        </div>
    );
};

export default Dashboard;
