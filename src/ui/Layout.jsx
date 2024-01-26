import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import Sidebar from './Sidebar';
import Header from './Header';

const StyledLayout = styled.div`
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100dvh;
`;
const Main = styled.main`
    background-color: var(--color-grey-50);

    padding: 3rem 3.5rem 5rem;
`;
function Layout() {
    return (
        <StyledLayout>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </StyledLayout>
    );
}

export default Layout;
