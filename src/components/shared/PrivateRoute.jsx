import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthDataContext } from './AuthDataContext';

const PrivateRoute = props => {
    const { component: Component, ...rest } = props;
    const userId = useContext(AuthDataContext);
    console.log(userId);

    return (
        <Route
            {...rest}
            render={props => (userId ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export { PrivateRoute };
