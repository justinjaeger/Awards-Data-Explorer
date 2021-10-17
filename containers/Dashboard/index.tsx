import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/auth';
import { useNotification } from '../../context/notification';
import { IProfileUser } from '../../types';
import FollowerList from './components/FollowerList';
import { User } from '.prisma/client';

type IDashboardProps = {
    profileUser: User;
    followingProfile: boolean;
    followerCount: number;
    followingCount: number;
};

export default function Dashboard(props: IDashboardProps) {
    const { profileUser, following: _following } = props;
    const { user, setUser } = useAuth();
    const { setNotification } = useNotification();

    const [dashboardModal, setDashboardModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<
        'follower' | 'following' | undefined
    >(undefined);
    // Need below in state because we could choose to unfollow
    const [following, setFollowing] = useState<boolean>(_following);
    const [followersCount, setFollowersCount] = useState<number>(
        profileUser.followers
    );

    // Determine if page is YOUR profile or someone else's
    const isMyProfile = user.username === profileUser.username;

    function setModal(_modalType: 'follower' | 'following' | undefined) {
        setDashboardModal(true);
        setModalType(_modalType);
    }

    // FOLLOW USER
    function followUser() {
        axios
            .post(`/api/users/${user.id}/following`, {
                profileUserId: profileUser.userId,
            })
            .then(() => {
                setFollowing(true);
                // update the following number
                setFollowersCount(followersCount + 1);
            })
            .catch((e) => {
                console.log('error following user: ', e.message);
            });
    }

    // UNFOLLOW USER
    function unfollowUser() {
        axios
            .delete(`/api/users/${user.id}/following/${profileUser.userId}`)
            .then(() => {
                setFollowing(false);
                // update the following number
                setFollowersCount(followersCount - 1);
            })
            .catch((err) => {
                if (err)
                    console.log('something went wrong fetching followers', err);
            });
    }

    // UPLOAD PROFILE IMAGE
    async function handleProfileImageUpload(e) {
        // Get the uploaded file
        const file = e.target.files[0];
        // Create a form with the file in it
        const formData = new FormData();
        formData.append('file', file);

        // Check that file is valid type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        let valid = false;
        validTypes.forEach((type) => {
            if (file.type === type) valid = true;
        });
        if (!valid) {
            return setNotification(
                'Not a valid image type. Accepts .jpeg / .jpg / .png'
            );
        }

        // Get the previous user image key
        // Not ssure why never used but uncommenting for now
        // const previousKey =
        //     user.image === "/PROFILE.png" ? null : user.image.slice(52);

        // generate unique new file name
        const randomNumber = Math.floor(Math.random() * 10000);
        const fileName = user.username + randomNumber + file.name;

        // save the image to DO Spaces & save the new url in database. Update user
        // NOTE: Changed from commented fetch below (in case isn't working)
        await axios
            .post(`/api/users/${user.id}/image/?key=${fileName}`, {
                data: { formData },
                headers: {
                    'Content-Type': 'image/jpg',
                },
            })
            .then((res) => {
                // convert url to edge url
                const image = `${res.data.url.slice(
                    0,
                    24
                )}.cdn${res.data.url.slice(24)}`;
                // setProfileImage(edgeUrl);
                setUser({
                    ...user,
                    image,
                });
            })
            .catch((e) =>
                console.log('error uploading image to Spaces: ', e.message)
            );

        // await fetch(`/api/image/uploadProfileImage?key=${fileName}`, {
        //     method: "POST",
        //     body: formData,
        //     "Content-Type": "image/jpg",
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         // convert url to edge url
        //         newUrl = res.url.slice(0, 24) + ".cdn" + res.url.slice(24);
        //         setProfileImage(newUrl);
        //     })
        //     .catch((err) =>
        //         console.log("error uplßoading image to Spaces", err)
        //     );

        // // If upload was successful...
        // if (edgeUrl) {
        //     // Write image to database
        //     await axios.post('/api/image/saveProfileImage', {
        //         username: user.username,
        //         edgeUrl,
        //     }).then((res) => console.log("success saving url"))
        //         .catch((err) => console.log("err saving url", err));
        //     // Delete previous image from Spaces if there is one
        //     if (previousKey) {
        //         await axios
        //             .post("/api/image/deleteProfileImage", { previousKey })
        //             .then((data) =>
        //                 console.log("success deleting previous image")
        //             )
        //             .catch((err) =>
        //                 console.log("err deleting previous image", err)
        //             );
        //     }
        // }
    }

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
                        src={profileUser.image}
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
                    <button id="follow-button" onClick={unfollowUser}>
                        Unfollow
                    </button>
                ) : (
                    <button id="follow-button" onClick={followUser}>
                        Follow
                    </button>
                )}

                <div id="dashboard-follower-buttons">
                    <button
                        onClick={() => setModal('follower')}
                        id="follower-button"
                    >
                        {profileUser.followers} followers
                    </button>
                    <button
                        onClick={() => setModal('following')}
                        id="follower-button"
                    >
                        {profileUser.following} following
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
