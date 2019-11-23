import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import { IconButton, Typography, Card } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginTop: '-2px'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    close: {
        marginTop: '-2px'
    }
}));

const Snack = React.forwardRef(function Snack(props, ref) {
    const classes = useStyles();
    const { id, message, onClose = () => {}, variant = 'info' } = props;
    const { closeSnackbar } = useSnackbar();
    const Icon = variantIcon[variant];

    const handleDismiss = () => {
        closeSnackbar(id);
        onClose();
    };

    return (
        <Card className={clsx(classes[variant], classes.container)} ref={ref} display="flex">
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            <Typography classes={{ root: classes.message }}>{message}</Typography>
            <IconButton aria-label="close" color="inherit" onClick={handleDismiss}>
                <CloseIcon className={clsx(classes.icon, classes.iconVariant, classes.close)} />
            </IconButton>
        </Card>
    );
});

export { Snack };
