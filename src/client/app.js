import { incrementAsync } from "./Reducers/storeReducer";
import store from "./store";

console.log("this is a test");

const { io } = require("socket.io-client");
require("./assets/styles.scss");

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

socket.emit("my-test");



incrementAsync(3);

export default "<div> Coucou </div>";