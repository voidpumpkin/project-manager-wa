import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthDataContext } from './AuthDataContext';

const PrivateRoute = props => {
    const { component: Component, ...rest } = props;
    const { userId } = useAuthDataContext();
    console.log(userId);

    return (
        <Route
            {...rest}
            render={props => (userId ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export { PrivateRoute };
