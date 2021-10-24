import styled from 'styled-components';
import theme from '../../theme';

export const NotificationContainer = styled.div({
    position: 'fixed',
    top: 20,
    left: 20,
    maxWidth: 600,
    color: theme.colors.black,
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    zIndex: 2,
});

export const NotificationContent = styled.div({
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
});
