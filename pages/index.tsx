import { useSession } from 'next-auth/client';
import React from 'react';
import Loading from '../components/Loading';

const Home = () => {
    const [, loading] = useSession();
    if (loading) return <Loading />;
    return <></>;
};

export default Home;
