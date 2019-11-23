import React from 'react';
import { FormControl, InputLabel, Input as MUIInput, FormHelperText } from '@material-ui/core';

const Input = props => {
    const {
        name,
        onChange,
        value,
        showError,
        errorText,
        helperText,
        type = 'text',
        endAdornment,
        required = false,
        formControllProps
    } = props;
    const lowerCaseName = name.toLowerCase();
    return (
        <FormControl {...{ required, error: showError }} {...formControllProps}>
            <InputLabel id={`${lowerCaseName}-input-label`} htmlFor={`${lowerCaseName}-input`}>
                {name}
            </InputLabel>
            <MUIInput
                id={`${lowerCaseName}-input`}
                aria-describedby={`${lowerCaseName}-input-label`}
                {...{ type, value, onChange, endAdornment }}
            />
            <FormHelperText
                id={
                    showError
                        ? `${lowerCaseName}-input-error-text`
                        : `${lowerCaseName}-input-helper-text`
                }
            >
                {showError ? errorText : helperText}
            </FormHelperText>
        </FormControl>
    );
};
export { Input };
