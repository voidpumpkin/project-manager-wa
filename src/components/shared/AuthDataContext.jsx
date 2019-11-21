import React, { createContext, useState, useMemo, useCallback } from 'react';

const AuthDataContext = createContext(null);

const initialAuthData = localStorage['userId'] ? parseInt(localStorage['userId'], 10) : undefined;

const AuthDataProvider = props => {
    const [userId, setUserId] = useState(initialAuthData);

    const onLogout = useCallback(() => {
        localStorage.removeItem('userId');
        setUserId(undefined);
    }, [setUserId]);

    const onLogin = useCallback(
        userId => {
            localStorage.setItem('userId', userId);
            setUserId(userId);
        },
        [setUserId]
    );

    const authDataValue = useMemo(() => {
        const isLoggedIn = !!userId;
        return { userId, isLoggedIn, onLogin, onLogout };
    }, [userId, onLogin, onLogout]);
    return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export { AuthDataContext, AuthDataProvider };
