import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';

const RegistrationPage = () => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => {
        initializeLayout({
            pageTitle: 'Registration',
            hideLayout: true,
            shouldContainerAlignMiddle: true
        });
    }, []);
    return <h1>Registration</h1>;
};

export { RegistrationPage };
