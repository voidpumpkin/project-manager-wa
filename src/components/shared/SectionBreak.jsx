import React from 'react';
import { Divider, Typography, Box } from '@material-ui/core';

const SectionBreak = props => {
    const { name } = props;
    return (
        <>
            <Box textAlign="center">
                <Typography variant="body1" component="h2">
                    {name}
                </Typography>
            </Box>
            <Divider variant="middle" />
        </>
    );
};

export { SectionBreak };
