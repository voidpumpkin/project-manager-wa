import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from './Snack';
import { getUserFetch } from '../../services/User';
import { AuthDataContext } from './AuthDataContext';
import { LayoutDataContext } from '../layout';

const UserDataContext = createContext(null);

const UserDataProvider = props => {
    const { isLoading, setIsLoading } = useContext(LayoutDataContext);

    const { _user, isLoggedIn } = useContext(AuthDataContext);

    const { id: userId } = _user || {};

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const [user, setUser] = useState(user);

    const refetchUser = useCallback(async () => {
        if (!isLoading && isLoggedIn) {
            setIsLoading(true);
            const response = await getUserFetch(userId);
            setIsLoading(false);
            if (!response.errors) {
                setUser(response.user);
                return response.user;
            } else {
                pushErrorMessage(`Failed to fetch user, try again later.`);
            }
        }
    }, [setIsLoading, getUserFetch, setUser, pushErrorMessage, isLoggedIn, isLoading]);

    useEffect(() => {
        refetchUser();
    }, []);

    return <UserDataContext.Provider value={{ user, refetchUser, setUser }} {...props} />;
};

export { UserDataContext, UserDataProvider };
