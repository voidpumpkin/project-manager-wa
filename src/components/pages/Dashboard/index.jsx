import React, { useEffect, useContext, useState } from 'react';
import { LayoutDataContext } from '../../layout';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { Box, Grid, Typography } from '@material-ui/core';
import {
    getManagedProjectsFetch,
    getParticipatedProjectsFetch,
    getUserFetch
} from '../../../services/User';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { ProjectCard } from './ProjectCard';
import { makeStyles } from '@material-ui/styles';
import { titleize } from 'underscore.string';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        textAlign: 'center',
        marginBottom: theme.spacing(1)
    },
    mBot2: {
        marginBottom: theme.spacing(2)
    },
    mTop1: {
        marginTop: theme.spacing(1)
    }
}));

const DashboardPage = () => {
    const classes = useStyles();
    const { userId } = useContext(AuthDataContext);
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
    const [user, setUser] = useState({});

    useEffect(() => {
        const handleResponse = (type, setter) => response => {
            if (!response.errors) {
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

    const userName = titleize(
        user.companyName ? user.companyName : `${user.firstName} ${user.lastName}`
    );

    useEffect(() => {
        initializeLayout({
            pageTitle: `${userName} Dashboard`
        });
    }, [userName]);

    return (
        <Box flexGrow={1}>
            <Typography className={clsx(classes.sectionTitle, classes.mTop1)} variant="h5">
                Projects you manage
            </Typography>
            <Grid className={classes.mBot2} container spacing={2} justify="center">
                {managedProjects.map((project, i) => (
                    <Grid key={i} item>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
            <Typography className={classes.sectionTitle} variant="h5">
                Projects you participate in
            </Typography>
            <Grid className={classes.mBot2} container spacing={2} justify="center">
                {participatedProjects.map((project, i) => (
                    <Grid key={i} item>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export { DashboardPage };
