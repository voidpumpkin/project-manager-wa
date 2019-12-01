import React, { useEffect, useContext, useState, useCallback } from 'react';
import { LayoutDataContext } from '../../layout';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import {
    getManagedProjectsFetch,
    getParticipatedProjectsFetch,
    getTasksFetch
} from '../../../services/User';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { ProjectCard } from './ProjectCard';
import { makeStyles } from '@material-ui/styles';
import { titleize } from 'underscore.string';
import clsx from 'clsx';
import { UserDataContext } from '../../shared/UserDataContext';
import { TaskCard } from './TaskCard';

const useStyles = makeStyles(theme => ({
    centerText: { textAlign: 'center' },
    sectionTitle: {
        marginBottom: theme.spacing(1)
    },
    mBot2: {
        marginBottom: theme.spacing(2)
    },
    container: {
        paddingTop: theme.spacing(1)
    }
}));

const DashboardPage = props => {
    const { history: routerHistory } = props;
    const classes = useStyles();
    const { refetchUser } = useContext(UserDataContext);
    const { initializeLayout, setIsLoading, isLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Dashboard'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const theme = useTheme();
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const [managedProjects, setManagedProjects] = useState([]);
    const [participatedProjects, setParticipatedProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState({});

    const linkToProject = id => {
        routerHistory.push(`/project/${id}`);
    };

    const linkToTask = id => {
        routerHistory.push(`/task/${id}`);
    };

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
            const participatedProjectsResponse = await getParticipatedProjectsFetch();
            const tasksResponse = await getTasksFetch();
            const fetchedUser = await refetchUser();
            handleResponse('managedProjects', setManagedProjects)(managedProjectsResponse);
            handleResponse(
                'participatedProjects',
                setParticipatedProjects
            )(participatedProjectsResponse);
            setUser(fetchedUser);
            handleResponse('tasks', setTasks)(tasksResponse);
            setUser(fetchedUser);
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
        <Box className={classes.container} flexGrow={1} width="100%">
            {!isLoading && (
                <>
                    {!!managedProjects.length && (
                        <>
                            <Typography
                                className={clsx(classes.sectionTitle, {
                                    [classes.centerText]: isSmallMobile
                                })}
                                variant="h5"
                            >
                                Projects you manage
                            </Typography>
                            <Grid
                                className={classes.mBot2}
                                container
                                spacing={2}
                                justify={isSmallMobile ? 'center' : undefined}
                            >
                                {managedProjects.map((project, i) => (
                                    <Grid key={i} item>
                                        <ProjectCard
                                            {...{ project, linkToProject, isManaging: true }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                    {!!participatedProjects.length && (
                        <>
                            <Typography
                                className={clsx(classes.sectionTitle, {
                                    [classes.centerText]: isSmallMobile
                                })}
                                variant="h5"
                            >
                                Projects you participate in
                            </Typography>
                            <Grid
                                className={classes.mBot2}
                                container
                                spacing={2}
                                justify={isSmallMobile ? 'center' : undefined}
                            >
                                {participatedProjects.map((project, i) => (
                                    <Grid key={i} item>
                                        <ProjectCard {...{ project, linkToProject }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                    {!!tasks.length && (
                        <>
                            <Typography
                                className={clsx(classes.sectionTitle, {
                                    [classes.centerText]: isSmallMobile
                                })}
                                variant="h5"
                            >
                                {"Tasks you're working on"}
                            </Typography>
                            <Grid
                                className={classes.mBot2}
                                container
                                spacing={2}
                                justify={isSmallMobile ? 'center' : undefined}
                            >
                                {tasks.map((task, i) => (
                                    <Grid key={i} item>
                                        <TaskCard {...{ task, linkToTask }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export { DashboardPage };
