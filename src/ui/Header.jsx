import { styled } from 'styled-components';
import Lougout from '../features/authentication/Lougout';

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);

    padding: 1rem 1.5rem;
`;
function Header() {
    return (
        <StyledHeader>
            <Lougout />
        </StyledHeader>
    );
}

export default Header;
