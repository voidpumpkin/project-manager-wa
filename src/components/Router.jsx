import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './shared/PrivateRoute';
import { GuestOnlyRoute } from './shared/GuestOnlyRoute';
import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';

const PAGE_PATHS = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    DASHBOARD: '/'
};

const Router = () => {
    return (
        <Switch>
            <GuestOnlyRoute path={PAGE_PATHS.LOGIN} component={LoginPage} />
            <GuestOnlyRoute path={PAGE_PATHS.REGISTRATION} component={RegistrationPage} />
            <PrivateRoute path={PAGE_PATHS.DASHBOARD} component={DashboardPage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
