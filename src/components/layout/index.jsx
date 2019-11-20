import React, { useState, createContext } from 'react';

//compoennts
import { NavBar } from './NavBar';

const LayoutContext = createContext();

const Layout = props => {
    const { children } = props;
    const [pageTitle, setPageTitle] = useState('NoTitle');

    return (
        <>
            <NavBar pageTitle={pageTitle} />
            <main role="main">
                <LayoutContext.Provider value={{ setPageTitle }}>{children}</LayoutContext.Provider>
            </main>
            <footer role="contentinfo">
                <p>Put copyright, etc. here.</p>
            </footer>
        </>
    );
};

export { Layout, LayoutContext };
