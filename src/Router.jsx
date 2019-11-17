import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';

const Router = () => (
    <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/register" component={RegistrationPage} />
        <PrivateRoute path="/" component={HomePage} />
    </Switch>
);

export { Router };
