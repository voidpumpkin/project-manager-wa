import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../Router';
import clsx from 'clsx';
import { LayoutDataContext } from './';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthDataContext } from '../shared/AuthDataContext';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
    horizontalList: {
        display: 'flex'
    },
    horizontalListIcon: {
        minWidth: '30px',
        color: 'inherit'
    },
    text: {
        whiteSpace: 'nowrap'
    }
});

const NavList = () => {
    const classes = useStyles();
    const { isMdUp } = useContext(LayoutDataContext);
    const { onLogout } = useContext(AuthDataContext);
    return (
        <List component="nav" className={clsx({ [classes.horizontalList]: isMdUp })}>
            <ListItem button component={Link} to={PAGE_PATHS.DASHBOARD}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={PAGE_PATHS.PROFILE}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem button onClick={() => onLogout()}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Log out</ListItemText>
            </ListItem>
        </List>
    );
};
export { NavList };
