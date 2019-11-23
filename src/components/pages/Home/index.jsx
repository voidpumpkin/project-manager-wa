import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { Button, Box, Typography } from '@material-ui/core';

const HomePage = () => {
    const { onLogout } = useContext(AuthDataContext);
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Home'
        });
    }, []);
    return (
        <Box flexGrow={1}>
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
        </Box>
    );
};

export { HomePage };
