import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthDataProvider } from './AuthDataContext';

const App = () => {
    return (
        <BrowserRouter>
            <AuthDataProvider>
                <Router />
            </AuthDataProvider>
        </BrowserRouter>
    );
};

export { App };
