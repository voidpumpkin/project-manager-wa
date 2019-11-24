import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, FormControlLabel, Switch } from '@material-ui/core';
import validatejs from 'validate.js';
import { Input } from '../../shared/Input';
import { SectionBreak } from './SectionBreak';

const useStyles = makeStyles(theme => ({
    mTop: {
        marginTop: theme.spacing(2)
    },
    mBot: {
        marginBottom: theme.spacing(2)
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
    },
    repeatPassword: {
        presence: {
            allowEmpty: false
        },
        equality: 'password'
    },
    isACompany: {
        presence: true,
        type: 'boolean'
    },
    companyName: function() {
        const attributes = arguments[1];
        if (!attributes.isACompany) return null;
        return {
            presence: {
                allowEmpty: false
            }
        };
    },
    firstName: {
        presence: {
            allowEmpty: false
        }
    },
    lastName: {
        presence: {
            allowEmpty: false
        }
    },
    email: {
        email: true
    },
    phoneNumber: {
        format: {
            pattern: '[0-9]+'
        }
    }
};

const SignUpForm = props => {
    const classes = useStyles();
    const { isShowingErrors, formValues, setFormValues, errors, setErrors } = props;

    const isFieldValid = field => errors[field].length === 0;

    const validateForm = (argFormValues = formValues) => {
        const validations = validatejs(argFormValues, constraints);
        const noErrors = {
            username: [],
            password: [],
            repeatPassword: [],
            isACompany: [],
            companyName: [],
            firstName: [],
            lastName: [],
            email: [],
            phoneNumber: []
        };
        const newErrors = { ...noErrors, ...(validations || {}) };
        setErrors(newErrors);
    };

    useEffect(() => {
        validateForm();
    }, []);

    const handleChange = field => event => {
        const newValues =
            field === 'isACompany'
                ? { ...formValues, isACompany: !formValues.isACompany }
                : { ...formValues, [field]: event.target.value };
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
            <SectionBreak name="Login information" className={classes.mTop} />
            <Input
                name="Username"
                showError={isShowingErrors && !isFieldValid('username')}
                errorText={errors.username[0]}
                className={classes.mTop}
                value={formValues.username}
                onChange={handleChange('username')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <Input
                name="Password"
                type="password"
                showError={isShowingErrors && !isFieldValid('password')}
                errorText={errors.password[0]}
                className={classes.mTop}
                value={formValues.password}
                onChange={handleChange('password')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <Input
                name="Repeat password"
                type="password"
                showError={isShowingErrors && !isFieldValid('repeatPassword')}
                errorText={errors.repeatPassword[0]}
                className={classes.mTop}
                value={formValues.repeatPassword}
                onChange={handleChange('repeatPassword')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <SectionBreak name="Contact information" className={classes.mTop} />
            <FormControlLabel
                className={classes.mTop}
                control={
                    <Switch
                        checked={formValues.isACompany}
                        onChange={handleChange('isACompany')}
                        value={formValues.isACompany}
                    />
                }
                label="I am a company"
            />
            {formValues.isACompany && (
                <Input
                    name="Company name"
                    showError={isShowingErrors && !isFieldValid('companyName')}
                    errorText={[...errors.isACompany, ...errors.companyName][0]}
                    className={classes.mTop}
                    value={formValues.companyName}
                    onChange={handleChange('companyName')}
                    formControllProps={{ fullWidth: true }}
                />
            )}
            <Input
                name="First name"
                showError={isShowingErrors && !isFieldValid('firstName')}
                errorText={errors.firstName[0]}
                className={classes.mTop}
                value={formValues.firstName}
                onChange={handleChange('firstName')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <Input
                name="Last name"
                showError={isShowingErrors && !isFieldValid('lastName')}
                errorText={errors.lastName[0]}
                className={classes.mTop}
                value={formValues.lastName}
                onChange={handleChange('lastName')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <Input
                name="Email"
                type="email"
                showError={isShowingErrors && !isFieldValid('email')}
                errorText={errors.email[0]}
                className={classes.mTop}
                value={formValues.email}
                onChange={handleChange('email')}
                formControllProps={{ fullWidth: true }}
                required
            />
            <Input
                name="Phone number"
                showError={isShowingErrors && !isFieldValid('phoneNumber')}
                errorText={errors.phoneNumber[0]}
                className={classes.mTop}
                value={formValues.phoneNumber}
                onChange={handleChange('phoneNumber')}
                formControllProps={{ fullWidth: true }}
                required
                startAdornment={<InputAdornment position="start">{'+370'}</InputAdornment>}
            />
        </form>
    );
};

export { SignUpForm };
