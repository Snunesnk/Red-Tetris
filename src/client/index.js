import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/app';
import { incrementAsync } from './reducers/storeReducer';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("tetris")
);

store.dispatch(incrementAsync())