import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthDataContext } from './AuthDataContext';

const GuestOnlyRoute = props => {
    const { component: Component, redirectTo = '/', ...rest } = props;
    const { isLoggedIn } = useContext(AuthDataContext);
    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn ? <Component {...props} /> : <Redirect to={redirectTo} />
            }
        />
    );
};

export { GuestOnlyRoute };
