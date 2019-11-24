import React, { useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { LayoutDataContext } from '../../layout';
import { postUserFetch } from '../../../services/User';
import { Button, Box, Typography, Link, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { pushErrorMessageFactory, pushSuccessMessageFactory } from '../../shared/Snack';
import { SignUpForm } from './SignUpForm';

const GENERAL_ERROR_MESSAGE = 'An error occured, please try again later';

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

const RegistrationPage = props => {
    const { history: routerHistory } = props;
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Registration page',
            hideLayout: true,
            containerSize: 'sm'
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = pushErrorMessageFactory(enqueueSnackbar);
    const pushSuccessMessage = pushSuccessMessageFactory(enqueueSnackbar);

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        isACompany: false,
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({
        username: [],
        password: [],
        repeatPassword: [],
        isACompany: [],
        companyName: [],
        firstName: [],
        lastName: [],
        email: [],
        phoneNumber: []
    });

    const [isLoading, setIsLoading] = useState(false);

    const isValid = () => {
        return !Object.keys(errors).some(key => errors[key].length > 0);
    };

    const [isShowingErrors, setIsShowingErrors] = useState(false);

    const handleUserPost = async postUserResponse => {
        const { errors: respErrors } = postUserResponse || {};
        if (!respErrors) {
            pushSuccessMessage('Successfuly registered');
            routerHistory.push('/login');
        } else {
            if (respErrors.some(err => err.title === 'username already taken')) {
                setErrors({ ...errors, username: ['Username already taken'] });
            } else {
                pushErrorMessage(GENERAL_ERROR_MESSAGE);
            }
        }
    };

    const onClick = async () => {
        if (!isLoading && isValid) {
            const {
                username,
                password,
                isACompany,
                companyName: formCompanyName,
                firstName,
                lastName,
                email,
                phoneNumber
            } = formValues;
            const companyName = isACompany ? formCompanyName : undefined;
            setIsLoading(true);
            const postUserResponse = await postUserFetch({
                username,
                password,
                isACompany,
                companyName,
                firstName,
                lastName,
                email,
                phoneNumber
            });
            setIsLoading(false);
            handleUserPost(postUserResponse);
        }
        setIsShowingErrors(true);
    };

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
                <Box bgcolor="secondary.dark" borderRadius="50%" lineHeight={1} p={1}>
                    {isLoading ? (
                        <CircularProgress className={classes.spinner} />
                    ) : (
                        <AssignmentIcon />
                    )}
                </Box>
                <Typography variant="h5" component="h1">
                    {'Sign up'}
                </Typography>
                <SignUpForm
                    {...{
                        isShowingErrors,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => onClick(e)}
                    className={clsx(classes.mTop, classes.fullWidth)}
                    type="submit"
                    form="login-form"
                    disabled={isLoading}
                >
                    {'Sign up'}
                </Button>
                <Link
                    component={RouterLink}
                    className={clsx(classes.mTop, classes.cta)}
                    to="/login"
                >
                    {'Already have an account? Sign in'}
                </Link>
            </Box>
        </Box>
    );
};

export { RegistrationPage };
