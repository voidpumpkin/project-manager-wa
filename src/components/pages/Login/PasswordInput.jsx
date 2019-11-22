import React, { useState } from 'react';
import { FormControl, InputLabel, Input, IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordInput = props => {
    const { onChange, value } = props;
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    return (
        <FormControl required fullWidth>
            <InputLabel id="password-input-label" htmlFor="password-input">
                Password
            </InputLabel>
            <Input
                id="password-input"
                aria-describedby="password-input-label"
                type={isShowingPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
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
        </FormControl>
    );
};
export { PasswordInput };
