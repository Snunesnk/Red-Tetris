import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './Components/App/index';
import store from './Store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#ea0e0e',
        },
        secondary: {
            main: 'rgb(232, 230, 227)',
        },
    },
    typography: {
        fontFamily: 'BarcadeBrawl, Arial',
    },
    components: {
        // Name of the component
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    lineHeight: '2.4375em',
                },
            },
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById("tetris")
);