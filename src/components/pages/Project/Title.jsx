import React, { useState, useEffect, useCallback } from 'react';
import { InputBase, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { patchProjectFetch } from '../../../services/Project';
import { pushErrorMessageFactory } from '../../shared/Snack';

const useStyles = makeStyles(theme => ({
    input: {
        ...theme.typography.h4,
        padding: theme.spacing(1)
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
    },
    disabled: {
        color: theme.palette.common.white + ' !important'
    },
    notDisabled: {
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    }
}));

const Title = props => {
    const {
        projectId,
        title = '',
        refetchProject,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        isManager
    } = props;
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
        return !!value;
    };

    const handleSave = async () => {
        if (!isLoading && isValid()) {
            setIsLoading(true);
            const response = await patchProjectFetch({ id: projectId, title: value });
            setIsLoading(false);
            if (!response.errors) {
                refetchProject();
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
        if (isManager) {
            setIsEditing(true);
        }
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
                className={clsx(classes.input, {
                    [classes.focused]: isEditing,
                    [classes.disabled]: !isManager,
                    [classes.notDisabled]: isManager
                })}
                value={value}
                onChange={e => setValue(e.target.value)}
                multiline
                fullWidth
                onClick={handleClick}
                inputProps={{ 'aria-label': 'naked' }}
                aria-describedby="title-input-label"
                disabled={!isManager}
                id="my-input"
            />
            {isEditing && (
                <>
                    <Button
                        type="submit"
                        form="project-title-form"
                        className={classes.button}
                        onClick={handleSave}
                        color="primary"
                        variant="contained"
                    >
                        Ok
                    </Button>
                    <Button
                        className={classes.button}
                        margin={1}
                        onClick={handleCancel}
                        color="primary"
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
