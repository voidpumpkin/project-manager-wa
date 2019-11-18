import React from 'react';
import { useAuthDataContext } from '../../AuthDataContext';
import { postLoginFetch } from '../../services/Auth';
import { getUserFetch } from '../../services/User';

const LoginPage = () => {
    const { onLogin } = useAuthDataContext();
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
            <h1>LoginPage</h1>
            <input type="button" onClick={e => onClick(e)} value="Login" />
        </>
    );
};

export { LoginPage };
