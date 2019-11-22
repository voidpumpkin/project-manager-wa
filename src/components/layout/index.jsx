import React from 'react';

//compoennts
import { Container } from '@material-ui/core';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { LayoutDataProvider } from './LayoutDataContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        flexGrow: 1
        // backgroundColor: '#108dd605'
    }
});

const Layout = props => {
    const { children } = props;
    const classes = useStyles();
    return (
        <LayoutDataProvider>
            <NavBar />
            <Container component="main" maxWidth="sm" className={classes.main}>
                {children}
            </Container>
            <Footer />
        </LayoutDataProvider>
    );
};

export { Layout };
