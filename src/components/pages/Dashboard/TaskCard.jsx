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

const TaskCard = props => {
    const { task, linkToTask } = props;
    const { id, title, details } = task;
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Card className={classes.card} onClick={() => linkToTask(id)}>
            <Box
                className={classes.div}
                style={{
                    backgroundColor: randomColor({
                        luminosity: 'bright',
                        hue: theme.palette.secondary.main
                    })
                }}
            ></Box>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{details}</Typography>
            </CardContent>
        </Card>
    );
};
export { TaskCard };
