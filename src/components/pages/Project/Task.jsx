import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ExpandLess, ExpandMore, FiberManualRecord } from '@material-ui/icons';
import { ListItem, ListItemText, List, Collapse, ListItemIcon, useTheme } from '@material-ui/core';
import tinycolor from 'tinycolor2';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(2)
    },
    icon: {
        minWidth: '30px'
    },
    list: {
        paddingLeft: theme.spacing(2)
    },
    link: {}
}));

const Task = props => {
    const { task = {}, color = '', _subTaskLevel = -1 } = props;
    const { title, subTasks } = task;
    const classes = useStyles();
    const theme = useTheme();

    const subTaskLevel = _subTaskLevel + 1;

    const [open, setOpen] = React.useState(true);

    const handleClick = e => {
        e.preventDefault();
        setOpen(!open);
    };

    const darkerColor = tinycolor(color)
        .darken(5)
        .toString();

    const hasSubTasks = !!subTasks.length;
    return (
        <>
            <ListItem
                component={Link}
                to="/tasks/1"
                button
                style={{ paddingLeft: theme.spacing(subTaskLevel) }}
            >
                <ListItemIcon className={classes.icon} style={{ color }}>
                    <FiberManualRecord />
                </ListItemIcon>
                <ListItemText primary={title} />
                {hasSubTasks &&
                    (open ? (
                        <ExpandLess onClick={handleClick} />
                    ) : (
                        <ExpandMore onClick={handleClick} />
                    ))}
            </ListItem>
            {hasSubTasks && (
                <Collapse component="li" in={open} timeout="auto">
                    <List disablePadding dense className={classes.list}>
                        {subTasks.map((e, i) => (
                            <Task key={i} color={darkerColor} task={e} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};
export { Task };
