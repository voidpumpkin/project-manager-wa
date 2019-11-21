import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout/LayoutDataContext';
import { AuthDataContext } from '../../shared/AuthDataContext';

//components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const HomePage = () => {
    const { onLogout } = useContext(AuthDataContext);
    const { setPageTitle } = useContext(LayoutDataContext);
    useEffect(() => setPageTitle('Home'), []);
    return (
        <>
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>{' '}
            <Typography variant="h2" component="h2">
                HomePage
            </Typography>
            <Button variant="contained" color="primary" onClick={() => onLogout()}>
                Logout
            </Button>
        </>
    );
};

export { HomePage };
