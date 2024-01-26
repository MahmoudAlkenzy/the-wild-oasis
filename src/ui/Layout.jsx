import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import Sidebar from './Sidebar';
import Header from './Header';

const StyledLayout = styled.div`
    padding: 4rem;
`;
const Main = styled.main`
    background-color: darkmagenta;
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
