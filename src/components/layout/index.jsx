import React from 'react';

//compoennts
import Container from '@material-ui/core/Container';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { LayoutDataProvider } from './LayoutDataContext';

import styles from './styles/Layout.css';

const Layout = props => {
    const { children } = props;
    return (
        <LayoutDataProvider>
            <NavBar />
            <Container maxWidth="sm" className={styles.main}>
                {children}
            </Container>
            <Footer />
        </LayoutDataProvider>
    );
};

export { Layout };
