import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, Typography, useTheme } from '@material-ui/core';
import { Task } from './Task';

const useStyles = makeStyles(theme => ({
    subheader: {
        display: 'flex',
        color: theme.palette.primary.dark,
        marginTop: theme.spacing(2)
    }
}));

const TaskList = props => {
    const { tasks = [], taskCount } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography className={classes.subheader}>
                {'Tasks ('}
                <Typography component="span" color="textPrimary">
                    {taskCount}
                </Typography>
                {')'}
            </Typography>
            {!!tasks.length && (
                <List aria-label="task-list" disablePadding dense>
                    {tasks.map((e, i) => (
                        <Task key={i} color={theme.palette.secondary.main} task={e} />
                    ))}
                </List>
            )}
        </>
    );
};
export { TaskList };
