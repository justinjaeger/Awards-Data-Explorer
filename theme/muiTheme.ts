import { createTheme } from '@mui/material/styles';
import React from 'react';
import theme from './index';

const muiTheme = createTheme({
    palette: {
        primary: {
            main: theme.colors.blue,
        },
        secondary: {
            main: theme.colors.yellow,
            dark: theme.colors.lightYellow,
        },
        success: {
            main: theme.colors.yellow,
        },
        error: {
            main: theme.colors.error,
        },
        warning: {
            main: theme.colors.warning,
        },
        background: {
            default: theme.colors.white,
        },
        text: {
            primary: theme.colors.black,
        },
        info: {
            main: theme.colors.grey,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                sizeLarge: {
                    minWidth: '100%',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export const muiStyles: { [key: string]: React.CSSProperties } = {
    headerTextStyle: {
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 400,
        fontSize: 20,
        color: theme.colors.white,
        textAlign: 'left',
    },
};

export default muiTheme;
