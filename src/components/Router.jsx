import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './shared/PrivateRoute';
import { GuestOnlyRoute } from './shared/GuestOnlyRoute';
import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { ProfilePage } from './pages/Profile';

const PAGE_PATHS = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    DASHBOARD: '/',
    PROFILE: '/profile'
};

const Router = () => {
    return (
        <Switch>
            <GuestOnlyRoute exact path={PAGE_PATHS.LOGIN} component={LoginPage} />
            <GuestOnlyRoute exact path={PAGE_PATHS.REGISTRATION} component={RegistrationPage} />
            <PrivateRoute exact path={PAGE_PATHS.DASHBOARD} component={DashboardPage} />
            <PrivateRoute exact path={PAGE_PATHS.PROFILE} component={ProfilePage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
