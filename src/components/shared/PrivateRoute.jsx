import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthDataContext } from './AuthDataContext';

const PrivateRoute = props => {
    const { component: Component, ...rest } = props;
    const { isLoggedIn } = useContext(AuthDataContext);
    return (
        <Route
            {...rest}
            render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export { PrivateRoute };
