import React, { useEffect, useContext, useState } from 'react';
import classnames from 'classnames';
import { LayoutDataContext } from '../../layout/LayoutDataContext';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { postLoginFetch } from '../../../services/Auth';
import { getUserFetch } from '../../../services/User';
import { Button, Box, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PasswordInput } from './PasswordInput';
import { UsernameInput } from './UsernameInput';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
    mTop: {
        marginTop: theme.spacing(2)
    },
    button: {
        width: '100%'
    },
    cta: {
        textAlign: 'right',
        width: '100%'
    }
}));

const LoginPage = () => {
    const classes = useStyles();
    const { onLogin } = useContext(AuthDataContext);
    const { setPageTitle } = useContext(LayoutDataContext);
    useEffect(() => setPageTitle('Login'), []);

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const handleChange = field => event => {
        setFormValues({ ...formValues, [field]: event.target.value });
    };

    const onClick = async () => {
        const { username, password } = formValues;
        const loginResponse = await postLoginFetch(username, password);
        if (!loginResponse.errors) {
            const userResponse = await getUserFetch();
            if (!loginResponse.errors) {
                const {
                    user: { id }
                } = userResponse;
                onLogin(id);
            }
        }
    };

    return (
        <Box
            component="form"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="background.paper"
            p={2}
            marginTop={4}
        >
            <Box bgcolor="secondary.main" borderRadius="50%" lineHeight={1} p={1}>
                <LockOutlinedIcon />
            </Box>
            <Typography variant="h5" component="h2">
                {'Sign in'}
            </Typography>
            <UsernameInput
                className={classes.mTop}
                value={formValues.username}
                onChange={handleChange('username')}
            />
            <PasswordInput
                className={classes.mTop}
                value={formValues.password}
                onChange={handleChange('password')}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={e => onClick(e)}
                className={classnames(classes.mTop, classes.button)}
            >
                {'Sign in'}
            </Button>
            <Link className={classnames(classes.mTop, classes.cta)} href="/register">
                {'Dont have an account? Sign up'}
            </Link>
        </Box>
    );
};

export { LoginPage };
