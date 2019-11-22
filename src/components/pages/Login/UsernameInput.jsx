import React from 'react';
import { TextField } from '@material-ui/core';

const UsernameInput = props => {
    const { onChange, value } = props;
    return (
        <TextField
            value={value}
            onChange={onChange}
            label="Username"
            required
            fullWidth
            InputLabelProps={{
                htmlFor: 'username-input',
                id: 'username-input-label'
            }}
            inputProps={{
                ['aria-describedby']: 'username-input-label',
                id: 'username-input'
            }}
        />
    );
};
export { UsernameInput };
