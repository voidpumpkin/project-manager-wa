import React from 'react';
import { MUITheme } from './MUITheme';
import { AuthDataProvider } from './shared/AuthDataContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Layout } from './layout';
import { CssBaseline } from '@material-ui/core';

const App = () => (
    <ThemeProvider theme={MUITheme}>
        <CssBaseline />
        <BrowserRouter>
            <AuthDataProvider>
                <Layout>
                    <Router />
                </Layout>
            </AuthDataProvider>
        </BrowserRouter>
    </ThemeProvider>
);

export { App };
