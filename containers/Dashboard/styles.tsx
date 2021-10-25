import styled from 'styled-components';
import theme from '../../theme';

export const DashboardModalContainer = styled.div(
    (props: { window: Window }) => ({
        display: 'flex',
        justifyContent: 'left',
        backgroundColor: theme.colors.white,
        width: '90%',
        maxWidth: 350,
        marginTop: props.window.outerHeight / 8,
        borderRadius: 8,
        height: 300,
    })
);
