import React, { useCallback, useState, createContext } from 'react';
import { Container } from '@material-ui/core';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexGrow: 1
    }
});

const LayoutDataContext = createContext(null);

const initialPageSettings = {
    pageTitle: 'NoTitle',
    hideLayout: false
};

const Layout = props => {
    const { children } = props;
    const classes = useStyles();
    const [pageSettings, setPageSettings] = useState(initialPageSettings);
    const initializeLayout = useCallback(
        newSettings => {
            setPageSettings({
                ...initialPageSettings,
                ...newSettings
            });
        },
        [pageSettings, setPageSettings]
    );
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <LayoutDataContext.Provider value={{ pageSettings, initializeLayout, isMdUp }}>
            <SnackbarProvider maxSnack={isMdUp ? 3 : 1}>
                <NavBar />
                <Container component="main" maxWidth="sm" className={classes.main}>
                    {children}
                </Container>
                <Footer />
            </SnackbarProvider>
        </LayoutDataContext.Provider>
    );
};

export { Layout, LayoutDataContext };
