import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Input } from './Input';

const PasswordInput = props => {
    const { onChange, value, showError, errorText, helperText } = props;
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    return (
        <Input
            name="Password"
            type={isShowingPassword ? 'text' : 'password'}
            formControllProps={{ fullWidth: true }}
            {...{ onChange, value, showError, errorText, helperText }}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setIsShowingPassword(!isShowingPassword)}
                        onMouseDown={e => e.preventDefault()}
                    >
                        {isShowingPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};
export { PasswordInput };
