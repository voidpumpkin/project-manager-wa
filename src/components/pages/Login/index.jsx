import React, { useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { LayoutDataContext } from '../../layout';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { postLoginFetch } from '../../../services/Auth';
import { getUserFetch } from '../../../services/User';
import { Button, Box, Typography, Link, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Snack } from '../../shared/Snack';
import { LoginForm } from './LoginForm';

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

const LoginPage = () => {
    const classes = useStyles();
    const { onLogin } = useContext(AuthDataContext);

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Login page',
            hideLayout: true,
            shouldContainerAlignMiddle: true
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: [],
        password: []
    });

    const [isLoading, setIsLoading] = useState(false);

    const isValid = () => {
        return !Object.keys(errors).some(key => errors[key].length > 0);
    };

    const [isShowingErrors, setIsShowingErrors] = useState(false);

    const pushErrorMessage = message => {
        enqueueSnackbar('', {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            },
            content: function LoginSnack(key) {
                return <Snack id={key} key={key} variant="error" message={message} />;
            }
        });
    };

    const handleFailedLogin = loginResponse => {
        const isUnauthorized = loginResponse.errors.some(err => err.title === 'Unauthorized');
        if (isUnauthorized) {
            pushErrorMessage('Failed to login: bad credentials');
        } else {
            pushErrorMessage(GENERAL_ERROR_MESSAGE);
        }
    };

    const handleLogin = async loginResponse => {
        if (!loginResponse.errors) {
            setIsLoading(true);
            const userResponse = await getUserFetch();
            setIsLoading(false);
            if (!userResponse.errors) {
                const { user } = userResponse || {};
                const { id } = user || {};
                onLogin(id);
            } else {
                pushErrorMessage(GENERAL_ERROR_MESSAGE);
            }
        } else {
            handleFailedLogin(loginResponse);
        }
    };

    const onClick = async () => {
        if (!isLoading && isValid) {
            const { username, password } = formValues;
            setIsLoading(true);
            const loginResponse = await postLoginFetch(username, password);
            setIsLoading(false);
            handleLogin(loginResponse);
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
                <Box bgcolor="secondary.main" borderRadius="50%" lineHeight={1} p={1}>
                    {isLoading ? (
                        <CircularProgress className={classes.spinner} />
                    ) : (
                        <LockOutlinedIcon />
                    )}
                </Box>
                <Typography variant="h5" component="h2">
                    {'Sign in'}
                </Typography>
                <LoginForm {...{ isShowingErrors, formValues, setFormValues, errors, setErrors }} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => onClick(e)}
                    className={clsx(classes.mTop, classes.fullWidth)}
                    type="submit"
                    form="login-form"
                    disabled={isLoading}
                >
                    {'Sign in'}
                </Button>
                <Link
                    component={RouterLink}
                    className={clsx(classes.mTop, classes.cta)}
                    to="/register"
                >
                    {'Dont have an account? Sign up'}
                </Link>
            </Box>
        </Box>
    );
};

export { LoginPage };
