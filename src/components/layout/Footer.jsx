import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { LayoutDataContext } from './';

const Footer = () => {
    const {
        pageSettings: { hideLayout }
    } = useContext(LayoutDataContext);
    return hideLayout ? null : (
        <Box component="footer" bgcolor="primary.dark" color="primary.contrastText" p={2}>
            <Typography variant="body2" component="p">
                <Box fontWeight="fontWeightBold" component="span">
                    DISCLAIMER:
                </Box>
                {
                    ' This app is made for learning purposes only as part of a university "Programming technologies" course.'
                }
            </Typography>
        </Box>
    );
};
export { Footer };
