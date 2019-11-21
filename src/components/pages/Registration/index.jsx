import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout/LayoutDataContext';

const RegistrationPage = () => {
    const { setPageTitle } = useContext(LayoutDataContext);
    useEffect(() => setPageTitle('Registration'), []);
    return <h1>Registration</h1>;
};

export { RegistrationPage };
