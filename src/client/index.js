import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { App } from './Containers/App/index';

console.log("this is a test");

const { io } = require("socket.io-client");

const socket = io();

socket.on("connect", () => {
    // either with send()  
    socket.send("Hello Server I'm client!");
    // or with emit() and custom event names 
    socket.emit("salutations", "Hello server!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});
// handle the event sent with socket.send()
socket.on("message", data => { console.log(data); });
// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => { console.log(elem1, elem2, elem3); });

socket.on("my-test", () => {
    console.log("This is my test");
})

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("tetris")
);