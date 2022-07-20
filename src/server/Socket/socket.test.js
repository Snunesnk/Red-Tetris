import createGame from "./Game/create";
import { Games } from "../const";

// Create a fake socket to test
class FakeSocket {
    constructor() {
        this.msg = [];
        this.msgObj = [];
        this.dest = [];
        this.id = Math.floor(Math.random() * 100000000);
        this.game = "";
    }

    emit(msg, msgObj = null) {
        this.msg.push(msg);
        if (msgObj !== null)
            this.msgObj.push(msgObj)

        return this;
    }

    to(dest) {
        this.dest.push(dest);

        return this;
    }

    join(gameName) {
        this.game = gameName;
    }
}


/// GAME ///
describe("Game", () => {
    test("Create a game", () => {
        let socket = new FakeSocket();
        let io = new FakeSocket();
        let payload = {
            gameName: "MyGameCreated",
            playername: "MyPlayer"
        };

        createGame(payload, socket, io);

        expect(Games[0].name).toMatch("MyGameCreated");
        expect(Games[0].players[0].name).toMatch("MyPlayer");
        console.log(Games);
        console.log(socket);
        console.log(io);
    });
    test("Edit a game", () => {

    });
});


/// IN GAME ///
describe("In game", () => {

});

module.exports = FakeSocket;