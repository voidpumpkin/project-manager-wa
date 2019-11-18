import React from 'react';
import { useAuthDataContext } from '../../AuthDataContext';

const LoginPage = () => {
    const { onLogin } = useAuthDataContext();
    return (
        <>
            <h1>LoginPage</h1>
            <input type="button" onClick={() => onLogin({ userId: 69 })} value="Login" />
        </>
    );
};

export { LoginPage };
