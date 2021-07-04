import React, { useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import FollowerList from "./components/FollowerList";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import Context from '../../context/auth';
import { IProfileUser } from '../../types';
import { 
    IGenericResponse,
    IUploadImageResponse,
    ISaveImageResponse,
} from '../../types/responses';

type IDashboardProps = {
    profileUser: IProfileUser;
    following: boolean;
}

export default function Dashboard(props: IDashboardProps) {

    const { 
        profileUser, 
        following: _following,
    } = props;

    const { user } = useContext(Context.Auth);

    const [notification, setNotification] = useState(false); // wrong type -- isn't this supposed to bubble to the top or no?
    const [dashboardModal, setModal] = useState<boolean>(false);
    const [following, setFollowing] = useState<boolean>(_following);
    const [followersCount, setFollowersCount] = useState<number>(profileUser.followers);

    // Determine if page is YOUR profile or someone else's
    const isMyProfile = user.username === profileUser.username ? true : false;

    // FOLLOW USER
    function followUser() {
        axios.post(`/api/users/${user.userId}/following`, { 
            profileUserId: profileUser.userId,
        }).then((res: AxiosResponse<IGenericResponse>) => {
                setFollowing(true);
                // update the following number
                setFollowersCount(followersCount + 1);
            })
            .catch((err) => {
                if (err)
                    console.log("something went wrong fetching followers", err);
            });
    }

    // UNFOLLOW USER
    function unfollowUser() {
        console.log("clicked unfollow user");
        axios.delete(`/api/users/${user.userId}/following/${profileUser.userId}`, { 
            headers: {
                Authorization: authorizationToken, // SHOULD I HAVE THIS
            }
        }).then((res: AxiosResponse<IGenericResponse>) => {
                setFollowing(false);
                // update the following number
                setFollowersCount(followersCount - 1);
            })
            .catch((err) => {
                if (err)
                    console.log("something went wrong fetching followers", err);
            });
    }

    // Upload Profile Image
    async function handleProfileImageUpload(e) {
        // Get the uploaded file
        const file = e.target.files[0];
        // Create a form with the file in it
        const formData = new FormData();
        formData.append("file", file);

        // Check that file is valid type
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        let valid = false;
        validTypes.forEach((type) => {
            if (file.type === type) valid = true;
        });
        if (!valid)
            return setNotification(
                "Not a valid image type. Accepts .jpeg / .jpg / .png"
            );

        // Get the previous user image key
        const previousKey =
            user.image === "/PROFILE.png" ? null : user.image.slice(52);

        // generate unique new file name
        let randomNumber = Math.floor(Math.random() * 10000);
        const fileName = user.username + randomNumber + file.name;

        // save the image to DO Spaces & get edge url
        // NOTE: Changed from commented fetch below if no work
        let newUrl;
        await axios.post(`/api/image/uploadProfileImage?key=${fileName}`, {
            data: { formData },
            headers: {
                'Content-Type': 'image/jpg',
            }
        })
            .then((res: AxiosResponse<IUploadImageResponse>) => {
                // convert url to edge url
                newUrl = res.url.slice(0, 24) + ".cdn" + res.url.slice(24);
                setProfileImage(newUrl);
                // Should update the root state context when updating user aka global data - current authenticated user is a great use case for this
            })
            .catch((err) =>
                console.log("error uplßoading image to Spaces", err)
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

        // If upload was successful...
        if (newUrl) {
            // Write image to database
            await axios.post('/api/image/saveProfileImage', {
                username, 
                newUrl,
            }).then((res: AxiosResponse<ISaveImageResponse>) => console.log("success saving url"))
                .catch((err) => console.log("err saving url", err));
            // Delete previous image from Spaces if there is one
            if (previousKey) {
                await axios
                    .post("/api/image/deleteProfileImage", { previousKey })
                    .then((data) =>
                        console.log("success deleting previous image")
                    )
                    .catch((err) =>
                        console.log("err deleting previous image", err)
                    );
            }
        }
    }

    // Load the skeleton until the data has been fetched
    return (
        <div id="dashboard-content">
            {notification && (
                <Notification setNotification={setNotification}>
                    {notification}
                </Notification>
            )}

            {isMyProfile
                ? [
                      // If IS my profile:
                      <label htmlFor="file-upload">
                          <div>
                              <img
                                  src={profileImage}
                                  className="profile-image-lg dashboard-profile-image"
                              />
                              <div id="dashboard-image-hover">Upload Image</div>
                          </div>
                      </label>,
                      <input
                          id="file-upload"
                          type="file"
                          onChange={handleProfileImageUpload}
                      />,
                  ]
                : [
                      // If NOT my profile:
                      <label htmlFor="file-upload">
                          <img
                              src={profileImage}
                              className="profile-image-lg dashboard-profile-image-logout"
                          />
                      </label>,
                  ]}

            <div id="dashboard-info">
                {!isMyProfile && <div id="profile-name">{profileUsername}</div>}

                {isMyProfile && <div id="profile-name">{profileUsername}</div>}

                {!isMyProfile &&
                    loggedIn && [
                        // If someone else's profile AND logged in:
                        following && (
                            <button
                                id="follow-button"
                                onClick={() =>
                                    unfollowUser(profileUsername, username)
                                }
                            >
                                Unfollow
                            </button>
                        ),
                        !following && (
                            <button
                                id="follow-button"
                                onClick={() =>
                                    followUser(profileUsername, username)
                                }
                            >
                                Follow
                            </button>
                        ),
                    ]}

                <div id="dashboard-follower-buttons">
                    <button
                        onClick={() => setModal("follower")}
                        id="follower-button"
                    >
                        {numFollowers} followers
                    </button>
                    <button
                        onClick={() => setModal("following")}
                        id="follower-button"
                    >
                        {numFollowing} following
                    </button>
                </div>
            </div>

            {dashboardModal && (
                <Modal setModal={setModal}>
                    <div id="follower-list-container">
                        {dashboardModal === "follower" && (
                            <div id="follower-title">Followers:</div>
                        )}
                        {dashboardModal === "following" && (
                            <div id="follower-title">Following:</div>
                        )}
                        <FollowerList
                            title={dashboardModal}
                            profileUsername={profileUsername}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}
