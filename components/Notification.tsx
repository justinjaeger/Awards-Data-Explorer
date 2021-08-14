import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { notification, setNotification } from '../context/app';

export default function Notification() {
    useEffect(() => {
        setTimeout(() => {
            setNotification(undefined);
        }, 4000);
    });

    if (notification) {
        return (
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
        );
    }
}
