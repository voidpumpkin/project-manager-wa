import React, { useEffect, useContext } from 'react';
import { LayoutContext } from '../../layout';

const RegistrationPage = () => {
    const { setPageTitle } = useContext(LayoutContext);
    useEffect(() => setPageTitle('Registration'), []);
    return <h1>Registration</h1>;
};

export { RegistrationPage };
