import { createMuiTheme } from '@material-ui/core/styles';

const MUITheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#e7ff8c',
            main: '#b2ff59',
            dark: '#7ecb20',
            contrastText: '#000000'
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000000'
        }
    }
});

export { MUITheme };
