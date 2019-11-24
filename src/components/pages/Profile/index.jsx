import React, { useEffect, useContext, useState, useRef } from 'react';
import clsx from 'clsx';
import { LayoutDataContext } from '../../layout';
import { getUserFetch, patchUserFetch } from '../../../services/User';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory, pushSuccessMessageFactory } from '../../shared/Snack';
import { SignUpForm } from './SignUpForm';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { AuthDataContext } from '../../shared/AuthDataContext';

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

    const { userId } = useContext(AuthDataContext);

    const { initializeLayout, isLoading, setIsLoading } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Profile',
            containerSize: 'sm'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = pushErrorMessageFactory(enqueueSnackbar);
    const pushSuccessMessage = pushSuccessMessageFactory(enqueueSnackbar);

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

    const fetchUser = async () => {
        const userResponse = await getUserFetch(userId);
        if (!userResponse.errors) {
            let values = Object.keys(formValues).reduce((prev, curr) => {
                const value = userResponse.user[curr] || formValues[curr];
                return {
                    ...prev,
                    [curr]: value
                };
            }, {});
            values.isACompany = !!userResponse.user.companyName;
            values.password = '';
            initialValues.current = values;
            setFormValues(values);
            setUpdatedValues({});
        } else {
            pushErrorMessage('Failed to fetch user, try again later.');
        }
        setIsLoading(false);
    };

    const onClick = async () => {
        if (!isLoading && isValid()) {
            const userResponse = await patchUserFetch(updatedValues);
            if (!userResponse.errors) {
                fetchUser();
                pushSuccessMessage('Successfuly updated');
            } else {
                pushErrorMessage('Faled to update, try again later');
            }
        }
        setIsShowingErrors(true);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUser();
    }, []);

    return (
        <Box flexGrow={1} display="flex" justifyContent="space-between" alignContent="center">
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
                    <AccountBoxIcon color="common.black" />
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
                    form="login-form"
                    disabled={isLoading || Object.keys(updatedValues).length === 0}
                >
                    {'Update'}
                </Button>
            </Box>
        </Box>
    );
};

export { ProfilePage };
