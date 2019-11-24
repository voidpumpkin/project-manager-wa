import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../Router';
import clsx from 'clsx';
import { LayoutDataContext } from './';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';

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
            <ListItem button component={Link} to={PAGE_PATHS.DASHBOARD}>
                <ListItemIcon className={clsx({ [classes.horizontalListIcon]: isMdUp })}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
            </ListItem>
        </List>
    );
};
export { NavList };
