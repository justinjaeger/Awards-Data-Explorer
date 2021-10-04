import { Button, Typography } from '@mui/material';
import React from 'react';
import { muiStyles } from '../../theme/muiTheme';

const HeaderItem = (props: {
    label: string;
    href?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}) => {
    const { headerItem } = muiStyles;

    return (
        <Button
            style={{ transitionDuration: '0s' }}
            onClick={props.onClick}
            href={props.href}
            disableRipple={true}
        >
            <Typography
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    ...headerItem,
                    ...props.style,
                }}
            >
                {props.label}
            </Typography>
        </Button>
    );
};

export default HeaderItem;
