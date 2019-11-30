import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import randomColor from 'randomcolor';

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
    }
}));

const ProjectCard = props => {
    const { project, linkToProject, isManaging = false } = props;
    const { id, title, details } = project;
    const classes = useStyles();
    const theme = useTheme();
    const color = isManaging ? theme.palette.primary.main : theme.palette.primary.dark;
    return (
        <Card className={classes.card} onClick={() => linkToProject(id)}>
            <Box
                className={classes.div}
                style={{ backgroundColor: randomColor({ luminosity: 'bright', hue: color }) }}
            ></Box>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{details}</Typography>
            </CardContent>
        </Card>
    );
};
export { ProjectCard };
