import React, { useState, useEffect, useCallback } from 'react';
import { TextField as MUITextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { pushErrorMessageFactory } from '../../shared/Snack';
import AutocompleteMUI from '@material-ui/lab/Autocomplete';
import { Close as CloseIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { patchTaskFetch } from '../../../services/Task';

const useStyles = makeStyles(theme => ({
    input: {
        minWidth: '144px',
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
        color: theme.palette.secondary.main + ' !important',
        marginTop: theme.spacing(1)
    },
    disabled: {
        color: theme.palette.common.white + ' !important'
    }
}));

const Autocomplete = withStyles(theme => ({
    root: {
        '& .MuiInputBase-root:hover': {
            backgroundColor: theme.palette.background.paper
        }
    }
}))(AutocompleteMUI);

const TextField = withStyles(theme => ({
    root: {
        '& .MuiInput-underline:before': {
            display: 'none'
        },
        ...theme.typography.body1,
        '& .MuiInputLabel-shrink': {
            transform: 'none'
        }
    }
}))(MUITextField);

const Assignee = props => {
    const {
        taskId,
        refetchTask,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        assigneeId,
        participators = []
    } = props;
    const classes = useStyles();

    const getAssigneeValue = () => {
        return (
            participators.find(e => e.id === assigneeId) || {
                id: -1,
                username: 'Nobody'
            }
        );
    };

    const [value, setValue] = useState(getAssigneeValue());
    const [isClosable, setIsClosable] = useState(false);

    useEffect(() => {
        setValue(getAssigneeValue());
    }, [participators]);

    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const handleChange = async (event, value) => {
        const hasChanged = value.id !== assigneeId;
        if (!isLoading && hasChanged) {
            setIsLoading(true);
            const response = await patchTaskFetch({ id: taskId, assigneeId: value.id });
            setIsLoading(false);
            if (!response.errors) {
                refetchTask();
                setValue(value);
            } else {
                response.errors.forEach(err => {
                    pushErrorMessage(err.title);
                    setValue(getAssigneeValue());
                });
            }
        } else {
            setValue(value);
        }
    };

    const handleOpen = () => {
        setIsClosable(true);
    };
    const handleClose = () => {
        setIsClosable(false);
    };

    const inputProps = {
        id: 'asignee-autocomplete',
        options: participators,
        getOptionLabel: option => option.username,
        renderInput: function TextFieldComponent(params) {
            return (
                <TextField
                    {...params}
                    className={clsx(classes.input, {
                        [classes.disabled]: participators.length < 1
                    })}
                    id="asignee-select"
                    label="Asignee"
                    color="secondary"
                    InputLabelProps={{
                        className: classes.label
                    }}
                    {...{
                        [participators.length < 1 ? 'InputProps' : undefined]: {
                            className: classes.disabled,
                            title: value?.username
                        }
                    }}
                />
            );
        },
        value,
        onChange: handleChange,
        disableClearable: true,
        popupIcon: isClosable ? <CloseIcon /> : null,
        autoComplete: true,
        onOpen: handleOpen,
        onClose: handleClose
    };

    return (
        <form
            id="asignee-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            {participators.length > 1 ? (
                <Autocomplete {...inputProps} />
            ) : (
                <AutocompleteMUI {...{ ...inputProps, disabled: true }} />
            )}
        </form>
    );
};
export { Assignee };
