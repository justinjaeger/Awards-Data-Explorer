import React from 'react';
import { Button } from '@mui/material';

type ILoginProps = {
    text: string;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
};

export default function Login(props: ILoginProps) {
    const { disabled, href, onClick, style, text } = props;

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            variant={'text'}
            color={'primary'}
            style={style}
            size={'medium'}
            href={href}
        >
            {text}
        </Button>
    );
}
