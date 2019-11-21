import React from 'react';

//components
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Footer = () => {
    return (
        <Box component="footer" bgcolor="primary.dark" p={2}>
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
