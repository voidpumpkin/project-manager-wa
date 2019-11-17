import React, { createContext, useState, useMemo, useContext, useCallback } from 'react';

const AuthDataContext = createContext(null);

const AuthDataProvider = props => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage['authData'] || '{}'));

    const onLogout = useCallback(() => {
        localStorage.removeItem('authData');
        setAuthData('{}');
    }, [setAuthData]);

    const onLogin = useCallback(
        data => {
            localStorage.setItem('authData', JSON.stringify(data));
            setAuthData(data);
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
