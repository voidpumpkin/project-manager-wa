import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';

const Router = () => (
    <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <PrivateRoute path="/" component={HomePage} />
    </Switch>
);

export { Router };
