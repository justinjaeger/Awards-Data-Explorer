import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Typography } from '@mui/material';
import { useNotification } from '../../context/notification';
import theme from '../../theme';
import { INotification } from '../../context/types';
import { NotificationContainer, NotificationContent } from './styles';

export default function Notification(props: INotification) {
    const { message, timeout, status } = props;
    const { notification, setNotification } = useNotification();
    const [visible, setVisible] = useState<boolean>(false);

    // for handling multiple notifications, need to do some sort of stack
    // make hoverable

    useEffect(() => {
        if (message) {
            setVisible(true);
            setTimeout(() => {
                setNotification(undefined);
            }, timeout || 5500);
            setTimeout(() => {
                setVisible(false);
            }, timeout - 500 || 5000);
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

    const icon = (() => {
        switch (status) {
            case 'success':
                return <CheckCircleOutlineIcon style={{ marginRight: 10 }} />;
            default:
                return <ErrorOutlineIcon style={{ marginRight: 10 }} />;
        }
    })();

    if (!visible && !notification) return null;

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
                    <NotificationContainer style={{ backgroundColor }}>
                        <NotificationContent>
                            {icon}
                            <Typography>{message}</Typography>
                        </NotificationContent>
                    </NotificationContainer>
                </motion.div>
            </div>
        </>
    );
}
