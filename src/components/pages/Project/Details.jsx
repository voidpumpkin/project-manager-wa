import React, { useState, useEffect, useCallback } from 'react';
import { InputBase, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { patchProjectFetch } from '../../../services/Project';
import { pushErrorMessageFactory } from '../../shared/Snack';

const useStyles = makeStyles(theme => ({
    input: {
        ...theme.typography.body1,
        padding: theme.spacing(1)
    },
    focused: {
        backgroundColor: theme.palette.background.paper
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: '0'
    },
    label: {
        color: theme.palette.primary.dark,
        marginTop: theme.spacing(2)
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

const Details = props => {
    const {
        projectId,
        details = '',
        refetchProject,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        isManager
    } = props;
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
            const response = await patchProjectFetch({ id: projectId, details: value });
            setIsLoading(false);
            if (!response.errors) {
                refetchProject();
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
        if (isManager) {
            setIsEditing(true);
        }
    };

    return (
        <form
            id="project-details-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <InputLabel className={classes.label} id="details-input-label" htmlFor="details-input">
                Details
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
                aria-describedby="details-input-label"
                disabled={!isManager}
                id="details-input"
            />
            {isEditing && (
                <>
                    <Button
                        type="submit"
                        form="project-details-form"
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
export { Details };
