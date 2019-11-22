import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './shared/PrivateRoute';
import { GuestOnlyRoute } from './shared/GuestOnlyRoute';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';

const PAGE_PATHS = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    HOME: '/'
};

const Router = () => {
    return (
        <Switch>
            <GuestOnlyRoute path={PAGE_PATHS.LOGIN} component={LoginPage} />
            <GuestOnlyRoute path={PAGE_PATHS.REGISTRATION} component={RegistrationPage} />
            <PrivateRoute path={PAGE_PATHS.HOME} component={HomePage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
