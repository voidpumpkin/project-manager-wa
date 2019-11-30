import React, { useEffect, useContext, useState, useCallback } from 'react';
import { LayoutDataContext } from '../../layout';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { makeStyles } from '@material-ui/styles';
import { getProjectFetch } from '../../../services/Project';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { Title } from './Title';
import { Details } from './Details';
import clsx from 'clsx';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { Manager } from './Manager';
import { TaskList } from './TaskList';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        marginBottom: theme.spacing(1)
    },
    mBot2: {
        marginBottom: theme.spacing(2)
    },
    mTop1: {
        marginTop: theme.spacing(1)
    },
    mTop4: {
        marginTop: theme.spacing(4)
    },
    input: {
        width: '90%'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20
    },
    flex: {
        display: 'flex'
    }
}));

const ProjectPage = props => {
    const { match } = props;
    const { params } = match || {};
    const { projectId } = params || {};

    const classes = useStyles();
    const { initializeLayout, setIsLoading, isLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Project page',
            hidePageTitle: true,
            containerSize: 'sm'
        });
    }, []);

    const { userId } = useContext(AuthDataContext);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const [project, setProject] = useState({});
    const [isManager, setIsManager] = useState(false);

    const handleResponse = response => {
        if (!response.errors) {
            const { project } = response;
            setProject(project);
            setIsManager(project.managerId === userId);
        } else {
            pushErrorMessage(`Failed to fetch project, try again later.`);
        }
    };

    const refetchProject = useCallback(async () => {
        setIsLoading(true);
        const response = await getProjectFetch(projectId);
        handleResponse(response);
        setIsLoading(false);
    }, [handleResponse, setIsLoading, getProjectFetch]);

    useEffect(() => {
        refetchProject();
    }, []);
    const { title, id, details, managerId, participators } = project;
    const fieldProps = {
        refetchProject,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        isManager,
        projectId: id
    };
    return (
        <Box flexGrow={1}>
            <Typography color="textPrimary" className={clsx(classes.mTop1, classes.flex)}>
                <ImportContactsIcon color="primary" className={classes.icon} />
                Project
            </Typography>
            <Title className={classes.input} {...{ ...fieldProps, title }} />
            <Manager {...{ ...fieldProps, managerId, participators }} />
            <Details className={classes.input} {...{ ...fieldProps, details }} />
            <TaskList tasks={project.tasks} taskCount={project.taskCount} />
        </Box>
    );
};

export { ProjectPage };
