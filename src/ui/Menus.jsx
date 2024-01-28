import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisHorizontal, HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutSideClick } from '../hooks/useOutSideClick';

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const MenusContext = createContext();
function Menus({ children }) {
    const [openId, setOpenId] = useState('');
    const [position, setPosion] = useState({ x: 30, y: 30 });
    const close = () => setOpenId('');
    const open = setOpenId;
    const setpos = setPosion;
    return (
        <MenusContext.Provider
            value={{ open, close, openId, setpos, position }}
        >
            {children}
        </MenusContext.Provider>
    );
}
function Toggle({ id }) {
    const { open, close, openId, setpos } = useContext(MenusContext);
    function clickHandler(e) {
        const rect = e.target.closest('button').getBoundingClientRect();
        setpos({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        openId === '' || openId !== id ? open(id) : close();
    }
    return (
        <StyledToggle onClick={clickHandler}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}
function List({ children, id }) {
    const { openId, position, close } = useContext(MenusContext);
    const { ref } = useOutSideClick(close);

    if (openId !== id) return null;
    return createPortal(
        <StyledList position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
}
function Button({ children, onClick, icon }) {
    const { close } = useContext(MenusContext);
    function clickHandler() {
        onClick?.();
        close();
    }
    return (
        <li>
            <StyledButton onClick={clickHandler}>
                {icon} <span>{children}</span>
            </StyledButton>
        </li>
    );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
