import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import validatejs from 'validate.js';
import { Input } from '../../shared/Input';
import { SectionBreak } from '../../shared/SectionBreak';

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
        length: { minimum: 1 }
    },
    oldPassword: function() {
        const [, attributes] = arguments;
        const password = attributes.password || '';
        if (password.length > 0)
            return {
                presence: {
                    allowEmpty: false
                }
            };
        return null;
    },
    repeatPassword: function() {
        const [, attributes] = arguments;
        const password = attributes.password || '';
        if (password.length > 0)
            return {
                presence: {
                    allowEmpty: false,
                    equality: 'oldPassword'
                }
            };
        return null;
    },
    password: {
        length: { minimum: 1 }
    },
    companyName: function() {
        const attributes = arguments[1];
        if (!attributes.isACompany) return null;
        return {
            presence: {
                length: { minimum: 1 }
            }
        };
    },
    firstName: {
        length: { minimum: 1 }
    },
    lastName: {
        length: { minimum: 1 }
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
    const {
        isShowingErrors,
        formValues,
        setFormValues,
        errors,
        setErrors,
        updatedValues,
        setUpdatedValues,
        initialValues
    } = props;

    const isFieldValid = field => errors[field].length === 0;

    const validateForm = (argFormValues = updatedValues) => {
        const validations = validatejs(argFormValues, constraints);
        const noErrors = {
            username: [],
            password: [],
            repeatPassword: [],
            oldPassword: [],
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
        const newFormValues = { ...formValues, [field]: event.target.value };
        setFormValues(newFormValues);
        if (event.target.value !== initialValues[field]) {
            const newUpdatedValues = { ...updatedValues, [field]: event.target.value };
            setUpdatedValues(newUpdatedValues);
            validateForm(newUpdatedValues);
        }
    };

    return (
        <form
            id="user-edit-form"
            className={classes.form}
            action="/"
            method="PATCH"
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
            />
            <Input
                name="Password"
                type="password"
                showError={isShowingErrors && !isFieldValid('oldPassword')}
                errorText={errors.oldPassword[0]}
                className={classes.mTop}
                value={formValues.oldPassword}
                onChange={handleChange('oldPassword')}
                formControllProps={{ fullWidth: true }}
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
            />
            <Input
                name="New password"
                type="password"
                showError={isShowingErrors && !isFieldValid('password')}
                errorText={errors.password[0]}
                className={classes.mTop}
                value={formValues.password}
                onChange={handleChange('password')}
                formControllProps={{ fullWidth: true }}
            />
            <SectionBreak name="Contact information" className={classes.mTop} />
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
            />
            <Input
                name="Last name"
                showError={isShowingErrors && !isFieldValid('lastName')}
                errorText={errors.lastName[0]}
                className={classes.mTop}
                value={formValues.lastName}
                onChange={handleChange('lastName')}
                formControllProps={{ fullWidth: true }}
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
            />
            <Input
                name="Phone number"
                showError={isShowingErrors && !isFieldValid('phoneNumber')}
                errorText={errors.phoneNumber[0]}
                className={classes.mTop}
                value={formValues.phoneNumber}
                onChange={handleChange('phoneNumber')}
                formControllProps={{ fullWidth: true }}
                startAdornment={<InputAdornment position="start">{'+370'}</InputAdornment>}
            />
        </form>
    );
};

export { SignUpForm };
