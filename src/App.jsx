import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthDataProvider } from './AuthDataContext';
import { Layout } from './Layout';

const App = () => {
    return (
        <BrowserRouter>
            <AuthDataProvider>
                <Layout>
                    <Router />
                </Layout>
            </AuthDataProvider>
        </BrowserRouter>
    );
};

export { App };
