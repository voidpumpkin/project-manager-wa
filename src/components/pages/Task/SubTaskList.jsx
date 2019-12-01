import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, Typography, useTheme } from '@material-ui/core';
import { SubTask } from './SubTask';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        color: theme.palette.secondary.main,
        marginTop: theme.spacing(2)
    }
}));

const SubTaskList = props => {
    const { tasks = [], taskCount } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography className={classes.header}>
                {'Subtasks ('}
                <Typography component="span" color="textPrimary">
                    {taskCount}
                </Typography>
                {')'}
            </Typography>
            {!!tasks.length && (
                <List aria-label="subtask-list" disablePadding dense>
                    {tasks.map((e, i) => (
                        <SubTask key={i} color={theme.palette.secondary.main} task={e} />
                    ))}
                </List>
            )}
        </>
    );
};
export { SubTaskList };
