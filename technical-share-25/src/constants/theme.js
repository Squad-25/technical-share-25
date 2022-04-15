import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        error: {
            main: "#BA3300",
        }
    },
    breakpoints: {
        values: {
            mobile: 360,
            tablet: 704,
            desktop: 1240,
        },
    }
});

export default theme