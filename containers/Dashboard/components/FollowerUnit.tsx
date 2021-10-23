import { User } from '@prisma/client';
import React from 'react';

type IFollowerUnitProps = {
    follower: User;
};

const FollowerUnit = (props: IFollowerUnitProps) => {
    const {
        follower: { username, image },
    } = props;

    return (
        <div id="follower-unit">
            <img className="profile-image-xsm" src={image} />
            <a href={`/user/${username}`} className="follower-unit-username">
                {username}
            </a>
        </div>
    );
};

export default FollowerUnit;
