import createGame from "./Game/create";
import { Games } from "../const";
import joinGame from "./Game/join";
import hostPlayer from "./Game/host";

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
    if (msgObj !== null) this.msgObj.push(msgObj);

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

describe("FakeSocket", () => {
    test("test fakeSocket", () => {
      let socket = new FakeSocket();
      let payload = {
        gameName: "MyGameCreated",
        playerName: "MyPlayer",
      };
      socket.emit("game:test", payload);
      expect(socket.msg[0]).toMatch("game:test");
      expect(socket.msgObj[0]).toMatchObject(payload);
    });
});

module.exports = FakeSocket;
