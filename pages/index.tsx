import React from "react";
import RankCategories from "../containers/RankGame/Categories";
import { IInitialProps } from '../types';

export default function Home(props: IInitialProps) {

    const { app: { url } } = props;

    return (
        <RankCategories URL={url} />
    );
}
