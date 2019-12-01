import React, { useEffect, useContext, useState, useCallback } from 'react';
import clsx from 'clsx';
import { LayoutDataContext } from '../../layout';
import { deleteUserFetch } from '../../../services/User';
import { Button, Box, Checkbox, FormControlLabel, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory, pushSuccessMessageFactory } from '../../shared/Snack';
import { AuthDataContext } from '../../shared/AuthDataContext';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        width: '100%',
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    container: {
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'inherit'
        },
        marginBottom: theme.spacing(2)
    },
    spinner: {
        width: '24px !important',
        height: '24px !important'
    },
    form: {
        width: '100%'
    },
    checkbox: {
        color: theme.palette.error.main + ' !important'
    }
}));

const DangerZone = () => {
    const classes = useStyles();

    const { onLogout } = useContext(AuthDataContext);

    const { initializeLayout, isLoading, setIsLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Profile',
            containerSize: 'sm'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);
    const pushSuccessMessage = useCallback(pushSuccessMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushSuccessMessageFactory
    ]);

    const [isChecked, setIsChecked] = useState(false);

    const onClick = async () => {
        if (!isLoading) {
            setIsLoading(true);
            const deleteResponse = await deleteUserFetch();
            setIsLoading(false);
            if (!deleteResponse.errors) {
                pushSuccessMessage('Successfuly deleted');
                onLogout(true);
            } else {
                pushErrorMessage('Failed to delete, try again later');
            }
        }
    };

    return (
        <Box
            className={classes.container}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="background.paper"
            p={2}
            marginTop="auto"
            marginBottom="auto"
        >
            <Box bgcolor="error.main" borderRadius="50%" lineHeight={1} p={1}>
                {isLoading ? <CircularProgress className={classes.spinner} /> : <WarningIcon />}
            </Box>
            <form
                id="user-delete-form"
                className={classes.form}
                action="/"
                method="PATCH"
                onSubmit={e => e.preventDefault()}
                noValidate
            >
                <FormControlLabel
                    value="right"
                    control={
                        <Checkbox
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            value={isChecked}
                            className={classes.checkbox}
                        />
                    }
                    label="I do understand that all my Projects, Tasks and User data WILL be deleted."
                    labelPlacement="end"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => onClick(e)}
                    className={clsx(classes.button)}
                    type="submit"
                    form="user-delete-form"
                    disabled={isLoading || !isChecked}
                >
                    {'Delete all my data'}
                </Button>
            </form>
        </Box>
    );
};

export { DangerZone };
