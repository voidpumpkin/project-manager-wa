import React from 'react';

//compoennts
import Box from '@material-ui/core/Box';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

import styles from './styles/Layout.css';
import { LayoutDataProvider } from './LayoutDataContext';

const Layout = props => {
    const { children } = props;
    return (
        <LayoutDataProvider>
            <NavBar />
            <Box component="main" className={styles.main}>
                {children}
            </Box>
            <Footer />
        </LayoutDataProvider>
    );
};

export { Layout };
