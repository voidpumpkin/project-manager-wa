import React, { useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const colors = [
    '#ca426f',
    '#662c40',
    '#d47c9a',
    '#aa0c41',
    '#db316a',
    '#f00a56',
    '#ad345c',
    '#c590a2',
    '#ebbdcc',
    '#e62f6c',
    '#f8246b',
    '#f56696'
];

const colorStyles = colors.reduce((prev, curr, i) => {
    return {
        ...prev,
        [`color${i}`]: {
            backgroundColor: curr
        }
    };
}, {});

const useStyles = makeStyles(theme => ({
    card: {
        '&:hover': {
            cursor: 'pointer',
            boxShadow: theme.shadows[12]
        },
        '&:active': {
            boxShadow: theme.shadows[1]
        }
    },
    div: {
        minWidth: '200px',
        maxWidth: '250px',
        paddingTop: '15%'
    },
    ...colorStyles
}));

const ProjectCard = props => {
    const { project } = props;
    const classes = useStyles();
    const color = useRef(`color${parseInt(Math.random() * colors.length)}`);
    return (
        <Card className={classes.card}>
            <Box className={clsx(classes.div, classes[color.current])}></Box>
            <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body1">{project.details}</Typography>
            </CardContent>
        </Card>
    );
};
export { ProjectCard };
