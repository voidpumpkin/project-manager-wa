import React, { useEffect, useContext, useState } from 'react';
import { LayoutDataContext } from '../../layout';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { Button, Box, Grid, Divider, Typography } from '@material-ui/core';
import {
    getManagedProjectsFetch,
    getParticipatedProjectsFetch,
    getUserFetch
} from '../../../services/User';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { ProjectCard } from './ProjectCard';
import { makeStyles } from '@material-ui/styles';
import { capitalize } from 'underscore.string';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    textAlignCenter: {
        textAlign: 'center'
    },
    mBot2: {
        marginBottom: theme.spacing(2)
    },
    mBot1: {
        marginBottom: theme.spacing(2)
    }
}));

const DashboardPage = () => {
    const classes = useStyles();
    const { onLogout, userId } = useContext(AuthDataContext);
    const { initializeLayout, setIsLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Dashboard'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = pushErrorMessageFactory(enqueueSnackbar);

    const [managedProjects, setManagedProjects] = useState([]);
    const [participatedProjects, setParticipatedProjects] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const handleResponse = (type, setter) => response => {
            if (!response.errors) {
                console.log(response[type]);
                setter(response[type]);
            } else {
                pushErrorMessage(`Failed to fetch ${type}, try again later.`);
            }
        };

        setIsLoading(true);
        (async () => {
            const managedProjectsResponse = await getManagedProjectsFetch();
            const participatedProjectsPresponse = await getParticipatedProjectsFetch();
            const userResponse = await getUserFetch(userId);
            handleResponse('managedProjects', setManagedProjects)(managedProjectsResponse);
            handleResponse(
                'participatedProjects',
                setParticipatedProjects
            )(participatedProjectsPresponse);
            handleResponse('user', setUser)(userResponse);
            setIsLoading(false);
        })();
    }, []);

    const userName = capitalize(
        user.companyName ? user.companyName : `${user.firstName} ${user.lastName}`
    );

    return (
        <Box flexGrow={1}>
            <Typography className={classes.textAlignCenter} variant="h4">
                {userName}
            </Typography>
            <Divider className={classes.mBot2} variant="middle" />
            <Typography className={clsx(classes.textAlignCenter, classes.mBot1)} variant="h5">
                Projects you manage
            </Typography>
            <Grid className={classes.mBot2} container spacing={2} justify="center">
                {managedProjects.map((project, i) => (
                    <Grid key={i} item>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
            <Typography className={clsx(classes.textAlignCenter, classes.mBot1)} variant="h5">
                Projects you participate in
            </Typography>
            <Grid className={classes.mBot2} container spacing={2} justify="center">
                {participatedProjects.map((project, i) => (
                    <Grid key={i} item>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={() => onLogout()}>
                Logout
            </Button>
        </Box>
    );
};

export { DashboardPage };
