import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../context/app';

export default function Notification() {
    const { notification, setNotification } = useAppState();

    useEffect(() => {
        setTimeout(() => {
            setNotification(undefined);
        }, 4000);
    }, [notification]);

    return (
        <>
            {notification && (
                <motion.div
                    id="notification"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0, duration: 0.5 }}
                >
                    {notification}
                    <button
                        id="notif-x-button"
                        onClick={() => setNotification(undefined)}
                    >
                        X
                    </button>
                </motion.div>
            )}
        </>
    );
}
