import React, { useState, useEffect, useCallback } from 'react';
import { InputBase, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { pushErrorMessageFactory } from '../../shared/Snack';
import { patchTaskFetch } from '../../../services/Task';

const useStyles = makeStyles(theme => ({
    input: {
        ...theme.typography.h4,
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
    hidden: {
        display: 'none'
    }
}));

const Title = props => {
    const { taskId, title = '', refetchTask, enqueueSnackbar, isLoading, setIsLoading } = props;
    const classes = useStyles();
    const [value, setValue] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setValue(title);
    }, [title]);

    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const isValid = () => {
        return !!value.length;
    };

    const handleSave = async () => {
        if (!isLoading && isValid()) {
            setIsLoading(true);
            const response = await patchTaskFetch({ id: taskId, title: value });
            setIsLoading(false);
            if (!response.errors) {
                refetchTask();
            } else {
                response.errors.forEach(err => {
                    pushErrorMessage(err.title);
                });
            }
            setIsEditing(false);
            setValue(title);
        }
        if (!isValid()) {
            pushErrorMessage('Title cannot be empty');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setValue(title);
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    return (
        <form
            id="project-title-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <InputLabel className={classes.hidden} id="title-input-label" htmlFor="title-input">
                Title
            </InputLabel>
            <InputBase
                className={clsx(classes.input, { [classes.focused]: isEditing })}
                value={value}
                onChange={e => setValue(e.target.value)}
                multiline
                fullWidth
                onClick={handleClick}
                inputProps={{ 'aria-label': 'naked' }}
                aria-describedby="title-input-label"
                id="my-input"
            />
            {isEditing && (
                <>
                    <Button
                        type="submit"
                        form="project-title-form"
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
export { Title };
