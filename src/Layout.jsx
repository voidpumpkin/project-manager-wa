import React from 'react';
import { Link } from 'react-router-dom';

const Layout = props => {
    const { children } = props;
    return (
        <>
            <nav role="navigation">
                <ul>
                    <li>
                        <Link to="/login">Login Page</Link>
                    </li>
                    <li>
                        <Link to="/register">Register Page</Link>
                    </li>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                </ul>
            </nav>
            <main role="main">{children}</main>
            <footer role="contentinfo">
                <p>Put copyright, etc. here.</p>
            </footer>
        </>
    );
};

export { Layout };
