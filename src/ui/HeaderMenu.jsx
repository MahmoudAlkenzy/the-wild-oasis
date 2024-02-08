import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';
const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function HeaderMenu() {
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            <ButtonIcon
                onClick={() => {
                    navigate('account');
                }}
            >
                <HiOutlineUser />
            </ButtonIcon>
            <Logout />
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;
