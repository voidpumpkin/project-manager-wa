import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { LayoutDataContext } from '../../layout';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory, pushSuccessMessageFactory } from '../../shared/Snack';
import { SignUpForm } from './SignUpForm';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { DangerZone } from './DangerZone';
import { UserDataContext } from '../../shared/UserDataContext';
import { patchUserFetch } from '../../../services/User';

const useStyles = makeStyles(theme => ({
    mTop: {
        marginTop: theme.spacing(2)
    },
    fullWidth: {
        width: '100%'
    },
    cta: {
        textAlign: 'right',
        width: '100%'
    },
    formContainer: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'inherit'
        }
    },
    spinner: {
        width: '24px !important',
        height: '24px !important'
    }
}));

const ProfilePage = () => {
    const classes = useStyles();

    const { user = {}, refetchUser } = useContext(UserDataContext);

    const { initializeLayout, isLoading } = useContext(LayoutDataContext);
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

    const initialValues = useRef({});

    const [formValues, setFormValues] = useState({
        username: '',
        oldPassword: '',
        repeatPassword: '',
        password: '',
        isACompany: false,
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [updatedValues, setUpdatedValues] = useState({});

    const [errors, setErrors] = useState({
        username: [],
        oldPassword: [],
        repeatPassword: [],
        password: [],
        isACompany: [],
        companyName: [],
        firstName: [],
        lastName: [],
        email: [],
        phoneNumber: []
    });

    const isValid = () => {
        return !Object.keys(errors).some(key => errors[key].length > 0);
    };

    const [isShowingErrors, setIsShowingErrors] = useState(false);

    useEffect(() => {
        let values = Object.keys(formValues).reduce((prev, curr) => {
            const value = user[curr] || formValues[curr];
            return {
                ...prev,
                [curr]: value
            };
        }, {});
        values.isACompany = !!user.companyName;
        values.password = '';
        initialValues.current = values;
        setFormValues(values);
        setUpdatedValues({});
    }, [user]);

    const onClick = async () => {
        if (!isLoading && isValid()) {
            const userResponse = await patchUserFetch(updatedValues);
            if (!userResponse.errors) {
                refetchUser();
                pushSuccessMessage('Successfuly updated');
            } else {
                const isUsernameTaken = userResponse.errors.some(
                    err => err.title === 'username already taken'
                );
                if (isUsernameTaken) {
                    setErrors({ ...errors, username: ['This username is already taken'] });
                } else {
                    pushErrorMessage('Faled to update, try again later');
                }
            }
        }
        setIsShowingErrors(true);
    };

    return (
        <Box flexGrow={1} display="flex" flexDirection="column">
            <Box
                className={classes.formContainer}
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                bgcolor="background.paper"
                p={2}
                marginTop="auto"
                marginBottom="auto"
            >
                <Box bgcolor="secondary.light" borderRadius="50%" lineHeight={1} p={1}>
                    <AccountBoxIcon />
                </Box>
                <SignUpForm
                    {...{
                        isShowingErrors,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                        updatedValues,
                        setUpdatedValues,
                        initialValues: initialValues.current
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => onClick(e)}
                    className={clsx(classes.mTop, classes.fullWidth)}
                    type="submit"
                    form="user-edit-form"
                    disabled={isLoading || Object.keys(updatedValues).length === 0}
                >
                    {'Update'}
                </Button>
            </Box>
            <DangerZone />
        </Box>
    );
};

export { ProfilePage };
