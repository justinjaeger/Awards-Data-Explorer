import Router from 'next/router';
import React, { useEffect } from 'react';
import { useNotification } from '../context/notification';

const NotFound = () => {
    const { setNotification } = useNotification();
    useEffect(() => {
        setNotification({
            status: 'warning',
            message: 'Page not found.',
        });
        Router.push('/');
    }, []);
    return <></>;
};

export default NotFound;
