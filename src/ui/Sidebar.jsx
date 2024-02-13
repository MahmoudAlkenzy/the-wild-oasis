import { styled } from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';

const Aside = styled.aside`
    background-color: var(--color-grey-0);
    padding: 1rem 1.5rem;
    grid-row: 1/-1;
    border: 1px solid var(--color-grey-100);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
`;
function Sidebar() {
    return (
        <Aside>
            <Logo />
            <MainNav />
            {/* <Uploader /> */}
        </Aside>
    );
}

export default Sidebar;
