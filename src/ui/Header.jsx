import { styled } from 'styled-components';

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);

    padding: 1rem 1.5rem;
`;
function Header() {
    return <StyledHeader>header</StyledHeader>;
}

export default Header;
