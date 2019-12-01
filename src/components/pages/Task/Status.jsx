import React, { useState, useCallback, useEffect } from 'react';
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

const options = [
    { title: 'Completed', value: true },
    { title: 'Not completed', value: false }
];

const Status = props => {
    const { taskId, refetchTask, enqueueSnackbar, isLoading, setIsLoading, isDone = false } = props;
    const classes = useStyles();

    const currentOption = options.find(e => e.value === isDone);

    const [value, setValue] = useState(currentOption);
    const [isClosable, setIsClosable] = useState(false);

    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    useEffect(() => {
        setValue(currentOption);
    }, [isDone]);

    const handleChange = async (event, value) => {
        const hasChanged = isDone !== value.value;
        if (!isLoading && hasChanged) {
            setIsLoading(true);
            const response = await patchTaskFetch({ id: taskId, isDone: value.value });
            setIsLoading(false);
            if (!response.errors) {
                refetchTask();
                setValue(value);
            } else {
                response.errors.forEach(err => {
                    pushErrorMessage(err.title);
                    setValue(currentOption);
                });
            }
        } else {
            setValue(currentOption);
        }
    };

    const handleOpen = () => {
        setIsClosable(true);
    };
    const handleClose = () => {
        setIsClosable(false);
    };

    const inputProps = {
        id: 'status-autocomplete',
        options: options,
        getOptionLabel: option => option.title,
        renderInput: function TextFieldComponent(params) {
            return (
                <TextField
                    {...params}
                    className={clsx(classes.input)}
                    id="status-select"
                    label="Status"
                    color="secondary"
                    InputLabelProps={{
                        className: classes.label
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
            id="status-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <Autocomplete {...inputProps} />
        </form>
    );
};
export { Status };
