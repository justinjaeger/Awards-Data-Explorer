import React from 'react';
import { IFollower } from '../../../types';

type IFollowerUnitProps = {
    follower: IFollower;
}

export default function FollowerUnit(props: IFollowerUnitProps) {

    const { 
        follower: { 
            username, 
            image,
        },
    } = props;

    return (
        <div id="follower-unit">
            <img className="profile-image-xsm" src={image} />
            <a href={`/user/${username}`} className="follower-unit-username">
                {username}
            </a>
        </div>
    );
}
