import React, { createContext, useState, useMemo, useContext, useCallback } from 'react';

const AuthDataContext = createContext(null);

const initialAuthData = localStorage['userId'] ? parseInt(localStorage['userId'], 10) : undefined;
const AuthDataProvider = props => {
    const [authData, setAuthData] = useState(initialAuthData);

    const onLogout = useCallback(() => {
        localStorage.removeItem('userId');
        setAuthData(initialAuthData);
    }, [setAuthData]);

    const onLogin = useCallback(
        userId => {
            localStorage.setItem('userId', userId);
            setAuthData(userId);
        },
        [setAuthData]
    );

    const authDataValue = useMemo(() => {
        return { ...authData, onLogin, onLogout };
    }, [authData, onLogin, onLogout]);

    return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

const useAuthDataContext = () => useContext(AuthDataContext);

export { AuthDataContext, AuthDataProvider, useAuthDataContext };
