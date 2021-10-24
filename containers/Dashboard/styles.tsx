import styled from 'styled-components';
import theme from '../../theme';

// Fancy one -- the parent. Hover over me
export const ImageWrapper = styled.div({
    position: 'absolute',
    padding: 10,
});

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
