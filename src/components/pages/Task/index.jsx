import React, { useEffect, useContext, useState, useCallback } from 'react';
import { LayoutDataContext } from '../../layout';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { makeStyles } from '@material-ui/styles';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import { Title } from './Title';
import { Details } from './Details';
import clsx from 'clsx';
import { Assignee } from './Assignee';
import { SubTaskList } from './SubTaskList';
import { getTaskFetch } from '../../../services/Task';
import { Project } from './Project';
import { getProjectFetch } from '../../../services/Project';
import { Status } from './Status';

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

const TaskPage = props => {
    const { match, history: routerHistory } = props;
    const { params } = match || {};
    const { taskId } = params || {};

    const classes = useStyles();
    const { initializeLayout, setIsLoading, isLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Task page',
            hidePageTitle: true,
            containerSize: 'sm'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const [task, setTask] = useState({});
    const [project, setProject] = useState({});

    const handleResponse = response => {
        if (!response.errors) {
            const { task } = response;
            setTask(task);
        } else {
            pushErrorMessage(`Failed to fetch task, try again later.`);
        }
    };

    useEffect(() => {
        if (task?.projectId) {
            (async () => {
                const response = await getProjectFetch(task?.projectId);
                if (!response.errors) {
                    const { project } = response;
                    setProject(project);
                } else {
                    response.errors.forEach(err => {
                        pushErrorMessage(err.title);
                    });
                }
            })();
        }
    }, [task.projectId]);

    const refetchTask = useCallback(async () => {
        setIsLoading(true);
        const response = await getTaskFetch(taskId);
        handleResponse(response);
        setIsLoading(false);
    }, [handleResponse, setIsLoading, getTaskFetch]);

    useEffect(() => {
        refetchTask();
    }, [taskId]);
    const { title, id, details, assigneeId, projectId, isDone } = task;
    const { participators, title: projectTitle } = project;

    const fieldProps = {
        refetchTask,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        taskId: id
    };
    return (
        <Box flexGrow={1} width="100%">
            <Typography color="textPrimary" className={clsx(classes.mTop1, classes.flex)}>
                <AssignmentIcon color="secondary" className={classes.icon} />
                Task
            </Typography>
            <Title className={classes.input} {...{ ...fieldProps, title }} />
            <Box display="flex">
                <Assignee {...{ ...fieldProps, assigneeId, participators }} />
                <Status {...{ ...fieldProps, taskId: id, isDone }} />
            </Box>
            <Project {...{ title: projectTitle, projectId, routerHistory }} />
            <Details className={classes.input} {...{ ...fieldProps, details }} />
            <SubTaskList tasks={task.subTasks} taskCount={task.subTaskCount} />
        </Box>
    );
};

export { TaskPage };
