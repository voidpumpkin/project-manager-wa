import React from 'react';
import { MUITheme } from './styles/MUITheme';

//components
import { AuthDataProvider } from './shared/AuthDataContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Layout } from './layout';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <AuthDataProvider>
                    <ThemeProvider theme={MUITheme}>
                        <Layout>
                            <Router />
                        </Layout>
                    </ThemeProvider>
                </AuthDataProvider>
            </BrowserRouter>
        </>
    );
};

export { App };
