import React from 'react';
import Lottie from 'react-lottie';
import * as LoadingSpinner from '../public/lottie/Loading.json';

type ILoadingProps = {
    height?: number;
    width?: number;
};

export default function Loading(props: ILoadingProps) {
    const { height, width } = props;
    return (
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: LoadingSpinner,
            }}
            height={height || 200}
            width={width || 200}
        />
    );
}
