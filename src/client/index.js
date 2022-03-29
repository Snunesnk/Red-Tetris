import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './Containers/App/index';
import store from './Reducers/storeReducer';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("tetris")
);