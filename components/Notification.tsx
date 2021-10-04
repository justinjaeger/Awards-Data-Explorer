import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../context/notification';
import theme from '../theme';
import { INotification } from '../context/types';

export default function Notification(props: INotification) {
    const { message, timeout, status } = props;
    const { setNotification } = useNotification();
    const [visible, setVisible] = useState<boolean>(false);

    // for handling multiple notifications, need to do some sort of stack
    // make hoverable

    useEffect(() => {
        if (message) {
            setVisible(true);
            setTimeout(() => {
                setNotification(undefined);
            }, timeout || 4000);
            setTimeout(() => {
                setVisible(false);
            }, timeout - 500 || 3500);
        }
    }, [message]);

    const backgroundColor = (() => {
        switch (status) {
            case 'success':
                return theme.colors.success;

            case 'error':
                return theme.colors.error;
            case 'warning':
            default:
                return theme.colors.warning;
        }
    })();

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 10000,
                }}
                onClick={() => setVisible(false)}
            >
                <motion.div
                    animate={{ opacity: visible ? 1 : 0 }}
                    initial={{ opacity: 0 }}
                    transition={{
                        delay: 0,
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            top: 10,
                            left: 20,
                            maxWidth: 600,
                            color: theme.colors.text,
                            backgroundColor: backgroundColor,
                            borderRadius: 5,
                            padding: 10,
                            zIndex: 2,
                        }}
                    >
                        {message}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
