/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
    height: 100dvh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
function ProtectedRoutes({ children }) {
    const navigate = useNavigate();
    // load the auth user
    const { isLoading, user, isAuthenticated } = useUser();

    // if No auth redirect into login page
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/login');
        },
        [isLoading, user, isAuthenticated, navigate]
    );
    // displya spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />;
            </FullPage>
        );

    //if is a user, render all child

    if (isAuthenticated) return children;
}

export default ProtectedRoutes;
