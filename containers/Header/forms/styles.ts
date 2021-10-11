import styled from 'styled-components';
import theme from '../../../theme';

export const FormContainer = styled.div(
    (props: { window: Window; height: number }) => ({
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        width: '90%',
        maxWidth: 350,
        marginTop: props.window.outerHeight / 8,
        borderRadius: 8,
        height: props.height,
    })
);

export const FormContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    maxWidth: '80%',
    marginBottom: 20,
});
