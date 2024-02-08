import { styled } from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2.4rem;
`;
function Header() {
    return (
        <StyledHeader>
            <UserAvatar />

            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;
