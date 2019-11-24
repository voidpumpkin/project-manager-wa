import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PasswordInput } from '../../shared/EyePasswordInput';
import validatejs from 'validate.js';
import { Input } from '../../shared/Input';

const useStyles = makeStyles(theme => ({
    mTop: {
        marginTop: theme.spacing(2)
    },
    form: {
        width: '100%'
    }
}));

const constraints = {
    username: {
        presence: {
            allowEmpty: false
        }
    },
    password: {
        presence: {
            allowEmpty: false
        }
    }
};

const LoginForm = props => {
    const classes = useStyles();
    const { isShowingErrors, formValues, setFormValues, errors, setErrors } = props;

    const isFieldValid = field => errors[field].length === 0;

    const validateForm = (argFormValues = formValues) => {
        const validations = validatejs(argFormValues, constraints);
        const noErrors = {
            username: [],
            password: []
        };
        const newErrors = { ...noErrors, ...(validations || {}) };
        setErrors(newErrors);
    };

    useEffect(() => {
        validateForm();
    }, []);

    const handleChange = field => event => {
        const newValues = { ...formValues, [field]: event.target.value };
        setFormValues(newValues);
        validateForm(newValues);
    };

    return (
        <form
            id="login-form"
            className={classes.form}
            action="/"
            method="POST"
            onSubmit={e => e.preventDefault()}
            noValidate
        >
            <Input
                name="Username"
                showError={isShowingErrors && !isFieldValid('username')}
                errorText={errors.username[0]}
                className={classes.mTop}
                value={formValues.username}
                onChange={handleChange('username')}
                formControllProps={{ fullWidth: true }}
            />
            <PasswordInput
                showError={isShowingErrors && !isFieldValid('password')}
                errorText={errors.password[0]}
                className={classes.mTop}
                value={formValues.password}
                onChange={handleChange('password')}
            />
        </form>
    );
};

export { LoginForm };
