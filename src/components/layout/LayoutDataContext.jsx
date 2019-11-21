import React, { createContext, useState } from 'react';

//hooks
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const LayoutDataContext = createContext(null);

const LayoutDataProvider = props => {
    const { children } = props;
    const [pageTitle, setPageTitle] = useState('NoTitle');
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <LayoutDataContext.Provider value={{ pageTitle, setPageTitle, isMdUp }}>
            {children}
        </LayoutDataContext.Provider>
    );
};

export { LayoutDataContext, LayoutDataProvider };
