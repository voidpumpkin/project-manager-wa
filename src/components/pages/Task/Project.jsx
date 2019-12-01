import React from 'react';
import { InputBase, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    input: {
        ...theme.typography.body1,
        padding: theme.spacing(1),
        color: theme.palette.text.primary + ' !important',
        cursor: 'pointer !important',
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    inputBase: {
        cursor: 'pointer !important'
    },
    label: {
        color: theme.palette.secondary.main,
        marginTop: theme.spacing(2)
    }
}));
const Project = ({ title = '', projectId, routerHistory }) => {
    const classes = useStyles();

    const handleClick = () => {
        routerHistory.push('/project/' + projectId);
    };
    return (
        <form
            id="project-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <InputLabel className={classes.label} id="project-input-label" htmlFor="project-input">
                Parent Project
            </InputLabel>
            <InputBase
                className={classes.input}
                value={title}
                onClick={handleClick}
                disabled
                inputProps={{ 'aria-label': 'naked', className: classes.inputBase }}
                aria-describedby="project-input-label"
                id="project-input"
            />
        </form>
    );
};
export { Project };
