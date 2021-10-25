import React from 'react';
import Image from 'next/image';
import { User } from '@prisma/client';
import TextButton from '../../../components/UI/TextButton';

type IFollowerUnitProps = {
    follower: User;
};

const FollowerUnit = (props: IFollowerUnitProps) => {
    const {
        follower: { username, image },
    } = props;

    return (
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
            <Image
                src={image}
                height={35}
                width={35}
                className={'profile-image'}
            />
            <TextButton text={username} href={`/user/${username}`} />
        </div>
    );
};

export default FollowerUnit;
