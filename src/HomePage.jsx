import React from 'react';
import { useAuthDataContext } from './AuthDataContext';

const HomePage = () => {
    const { onLogout } = useAuthDataContext();
    return (
        <>
            <h1>HomePage</h1>
            <input type="button" onClick={() => onLogout()} value="Logout" />
        </>
    );
};

export { HomePage };
