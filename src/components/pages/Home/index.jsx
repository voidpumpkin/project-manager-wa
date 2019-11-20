import React, { useEffect, useContext } from 'react';
import { LayoutContext } from '../../layout';
import { AuthDataContext } from '../../shared/AuthDataContext';
import Button from '@material-ui/core/Button';

const HomePage = () => {
    const { onLogout } = useContext(AuthDataContext);
    const { setPageTitle } = useContext(LayoutContext);
    useEffect(() => setPageTitle('Home'), []);
    return (
        <>
            {/* <h1>HomePage</h1> */}
            <Button variant="contained" color="primary" onClick={() => onLogout()}>
                Logout
            </Button>
        </>
    );
};

export { HomePage };
