import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, Typography, useTheme } from '@material-ui/core';
import { Task } from './Task';

const useStyles = makeStyles(theme => ({
    subheader: {
        display: 'flex',
        color: theme.palette.primary.dark
    }
}));

const TaskList = props => {
    const { tasks = [], taskCount } = props;
    const classes = useStyles();
    const theme = useTheme();

    // const test = [
    //     {
    //         title: 'Maaaa1aan',
    //         subTasks: [
    //             {
    //                 title: 'Maaaa21aan',
    //                 subTasks: [
    //                     { title: 'Maaaa31aan', subTasks: [] },
    //                     { title: 'Maaaa32aan', subTasks: [] }
    //                 ]
    //             },
    //             { title: 'Maaaa22aan', subTasks: [{ title: 'Maaaa3aan', subTasks: [] }] }
    //         ]
    //     },
    //     {
    //         title: 'Maaaa1aan',
    //         subTasks: [
    //             {
    //                 title: 'Maaaa21aan',
    //                 subTasks: [
    //                     { title: 'Maaaa31aan', subTasks: [] },
    //                     { title: 'Maaaa32aan', subTasks: [] }
    //                 ]
    //             },
    //             { title: 'Maaaa22aan', subTasks: [{ title: 'Maaaa3aan', subTasks: [] }] }
    //         ]
    //     }
    // ];

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
