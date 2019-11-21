import React, { useContext } from 'react';
import { PAGE_PATHS } from '../Router';
import classNames from 'classnames';
import { LayoutDataContext } from './LayoutDataContext';

//components
import HouseIcon from '@material-ui/icons/House';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import styles from './styles/NavList.css';

const NavList = () => {
    const { isMdUp } = useContext(LayoutDataContext);
    return (
        <List component="nav" className={classNames({ [styles.horizontalList]: isMdUp })}>
            <ListItem button component="a" href={PAGE_PATHS.LOGIN}>
                <ListItemIcon className={classNames({ [styles.horizontalListIcon]: isMdUp })}>
                    <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem button component="a" href={PAGE_PATHS.REGISTRATION}>
                <ListItemIcon className={classNames({ [styles.horizontalListIcon]: isMdUp })}>
                    <BorderColorIcon />
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
            </ListItem>
            <ListItem button component="a" href={PAGE_PATHS.HOME}>
                <ListItemIcon className={classNames({ [styles.horizontalListIcon]: isMdUp })}>
                    <HouseIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItem>
        </List>
    );
};
export { NavList };
