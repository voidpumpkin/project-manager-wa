import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout/LayoutDataContext';
import { AuthDataContext } from '../../shared/AuthDataContext';
import { postLoginFetch } from '../../../services/Auth';
import { getUserFetch } from '../../../services/User';

//components
import Button from '@material-ui/core/Button';

const LoginPage = () => {
    const { onLogin } = useContext(AuthDataContext);
    const { setPageTitle } = useContext(LayoutDataContext);
    useEffect(() => setPageTitle('Login'), []);

    const onClick = async () => {
        const loginResponse = await postLoginFetch();
        if (!loginResponse.errors) {
            const userResponse = await getUserFetch();
            console.log(userResponse);
            if (!loginResponse.errors) {
                const {
                    user: { id: userId }
                } = userResponse;
                onLogin(userId);
            }
        }
    };

    return (
        <>
            {/* <h1>LoginPage</h1> */}
            <Button variant="contained" color="primary" onClick={e => onClick(e)}>
                Login
            </Button>
        </>
    );
};

export { LoginPage };
