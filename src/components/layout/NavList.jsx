import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../Router';
import clsx from 'clsx';
import { LayoutDataContext } from './';
import HouseIcon from '@material-ui/icons/House';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    horizontalList: {
        display: 'flex'
    },
    horizontalListIcon: {
        minWidth: '30px',
        color: 'inherit'
    }
});

const NavList = () => {
    const classes = useStyles();
    const { isMdUp } = useContext(LayoutDataContext);
    return (
        <List component="nav" className={clsx({ [classes.horizontalList]: isMdUp })}>
            <ListItem button component={Link} to={PAGE_PATHS.LOGIN}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={PAGE_PATHS.REGISTRATION}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <BorderColorIcon />
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={PAGE_PATHS.HOME}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <HouseIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItem>
        </List>
    );
};
export { NavList };
