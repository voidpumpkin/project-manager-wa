import React, { useState } from 'react';
import logo from '../../../resources/logo.svg';

//components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { NavList } from './NavList';

import styles from './styles/NavBar';

const NavBar = props => {
    const { pageTitle } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = isOpen => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(isOpen);
    };

    return (
        <>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box className={styles.logoBottomBorder} width="16em" p={1}>
                    <img src={logo} alt="Project manager logo" className={styles.drawerLogo}></img>
                </Box>
                <NavList />
            </Drawer>
            <AppBar>
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
                        <Box className={styles.logoRightBorder} width="16em" p={1}>
                            <img
                                src={logo}
                                alt="Project manager logo"
                                className={styles.logo}
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
            </AppBar>
        </>
    );
};
export { NavBar };
