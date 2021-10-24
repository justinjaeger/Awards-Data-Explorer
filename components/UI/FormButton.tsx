import React from 'react';
import { Button } from '@mui/material';

type ILoginProps = {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
};

export default function Login(props: ILoginProps) {
    const { disabled, onClick, style, text } = props;

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            variant={'contained'}
            color={'secondary'}
            style={{
                ...style,
            }}
            size={'large'}
        >
            {text}
        </Button>
    );
}
