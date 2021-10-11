import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import theme from '../../theme';

type ILoginProps = {
    title: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    disabled?: boolean;
    error?: boolean;
    label?: string;
    password?: boolean;
};

export default function Login(props: ILoginProps) {
    const { title, input, setInput, disabled, error, label, password } = props;

    return (
        <FormControl
            color={'primary'} // top text color
            disabled={disabled || false}
            error={error || false}
            fullWidth={true}
            style={{ marginTop: 10, marginBottom: 10 }}
        >
            <InputLabel style={{ marginLeft: -10 }}>{title}</InputLabel>
            <Input
                color={'primary'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    borderRadius: 5,
                    color: theme.colors.black, // text color
                }}
                inputProps={{
                    type: password ? 'password' : undefined,
                }}
            />
            <FormHelperText style={{ marginLeft: 0 }}>{label}</FormHelperText>
        </FormControl>
    );
}
