import React, { useState, useEffect, useCallback } from 'react';
import { TextField as MUITextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { pushErrorMessageFactory } from '../../shared/Snack';
import AutocompleteMUI from '@material-ui/lab/Autocomplete';
import { Close as CloseIcon } from '@material-ui/icons';
import { patchProjectFetch } from '../../../services/Project';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    input: {
        minWidth: '160px',
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
        ...theme.typography.body1,
        color: theme.palette.primary.dark + ' !important',
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

const TextField = withStyles({
    root: {
        '& .MuiInput-underline:before': {
            display: 'none'
        }
    }
})(MUITextField);

const Manager = props => {
    const {
        projectId,
        managerId = '',
        refetchProject,
        enqueueSnackbar,
        isLoading,
        setIsLoading,
        isManager,
        participators = []
    } = props;
    const classes = useStyles();

    const managerValue = participators.find(e => e.id === managerId) || {
        id: managerId,
        username: 'Nobody'
    };

    const [value, setValue] = useState(null);
    const [isClosable, setIsClosable] = useState(false);

    useEffect(() => {
        setValue(managerValue);
    }, [participators]);

    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const handleClose = () => {
        setIsClosable(false);
    };

    const handleChange = async (event, value) => {
        const hasChanged = value.id !== managerId;
        if (!isLoading && hasChanged) {
            setIsLoading(true);
            const response = await patchProjectFetch({ id: projectId, managerId: value.id });
            setIsLoading(false);
            if (!response.errors) {
                refetchProject();
            } else {
                response.errors.forEach(err => {
                    pushErrorMessage(err.title);
                });
            }
            setValue(value);
        }
        setValue(managerValue);
    };

    const handleOpen = () => {
        setIsClosable(true);
    };

    const inputProps = {
        id: 'combo-box-demo',
        options: participators,
        getOptionLabel: option => option.username,
        renderInput: function TextFieldComponent(params) {
            return (
                <TextField
                    {...params}
                    className={clsx(classes.input, { [classes.disabled]: !isManager })}
                    id="manager-select"
                    label="Manager"
                    InputLabelProps={{
                        className: classes.label
                    }}
                    {...{
                        [!isManager ? 'InputProps' : undefined]: {
                            className: clsx({ [classes.disabled]: !isManager }),
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
            id="manager-form"
            action="/"
            method="PATCH"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            {isManager && participators.length > 1 ? (
                <Autocomplete {...inputProps} />
            ) : (
                <AutocompleteMUI {...{ ...inputProps, disabled: true }} />
            )}
        </form>
    );
};
export { Manager };
