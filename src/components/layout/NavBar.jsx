import React, { useState, useContext } from 'react';
import logo from '../../../resources/logo.svg';
import { LayoutDataContext } from './';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Hidden,
    Box,
    LinearProgress
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavList } from './NavList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    logo: {
        width: '100%'
    },
    drawerLogo: {
        width: '100%'
    },
    logoBottomBorder: {
        borderBottom: '0.1em solid rgba(0, 0, 0, 0.12)'
    },
    logoRightBorder: {
        borderRight: '0.1em solid rgba(0, 0, 0, 0.12)'
    },
    appBar: {
        position: 'sticky'
    }
});

const NavBar = () => {
    const classes = useStyles();
    const {
        pageSettings: { hideLayout, pageTitle },
        isLoading
    } = useContext(LayoutDataContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = isOpen => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(isOpen);
    };
    return hideLayout ? null : (
        <>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box className={classes.logoBottomBorder} width="16em" p={1}>
                    <img src={logo} alt="Project manager logo" className={classes.drawerLogo}></img>
                </Box>
                <NavList />
            </Drawer>
            <AppBar className={classes.appBar}>
                <Toolbar justify="content-between">
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            disabled={isDrawerOpen}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smDown>
                        <Box className={classes.logoRightBorder} width="16em" p={1}>
                            <img
                                src={logo}
                                alt="Project manager logo"
                                className={classes.logo}
                            ></img>
                        </Box>
                    </Hidden>{' '}
                    <Box flexGrow={1} ml={1}>
                        <Typography variant="h6" component="h1">
                            {pageTitle}
                        </Typography>
                    </Box>
                    <Hidden smDown>
                        <NavList />
                    </Hidden>
                </Toolbar>
                {isLoading && <LinearProgress color="secondary" />}
            </AppBar>
        </>
    );
};
export { NavBar };
