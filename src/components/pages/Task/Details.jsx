import React, { useState, useEffect, useCallback } from 'react';
import { InputBase, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { patchTaskFetch } from '../../../services/Task';

const useStyles = makeStyles(theme => ({
    input: {
        ...theme.typography.body1,
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    focused: {
        backgroundColor: theme.palette.background.paper
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: '0'
    },
    label: {
        color: theme.palette.secondary.main,
        marginTop: theme.spacing(2)
    }
}));

const Details = props => {
    const { taskId, details = '', refetchTask, enqueueSnackbar, isLoading, setIsLoading } = props;
    const classes = useStyles();
    const initialDetails = details ? details : 'No details';

    const [value, setValue] = useState(initialDetails);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setValue(details ? details : 'No details');
    }, [details]);

    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const handleSave = async () => {
        if (!isLoading) {
            setIsLoading(true);
            const response = await patchTaskFetch({ id: taskId, details: value });
            setIsLoading(false);
            if (!response.errors) {
                refetchTask();
            } else {
                response.errors.forEach(err => {
                    pushErrorMessage(err.title);
                });
            }
            setIsEditing(false);
            setValue(initialDetails);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setValue(initialDetails);
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    return (
        <form
            id="task-details-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <InputLabel className={classes.label} id="details-input-label" htmlFor="details-input">
                Details
            </InputLabel>
            <InputBase
                className={clsx(classes.input, { [classes.focused]: isEditing })}
                value={value}
                onChange={e => setValue(e.target.value)}
                multiline
                fullWidth
                onClick={handleClick}
                inputProps={{ 'aria-label': 'naked' }}
                aria-describedby="details-input-label"
                id="details-input"
            />
            {isEditing && (
                <>
                    <Button
                        type="submit"
                        form="task-details-form"
                        className={classes.button}
                        onClick={handleSave}
                        color="secondary"
                        variant="contained"
                    >
                        Ok
                    </Button>
                    <Button
                        className={classes.button}
                        margin={1}
                        onClick={handleCancel}
                        color="secondary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </>
            )}
        </form>
    );
};
export { Details };
