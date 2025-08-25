import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5000 });

let userCount = 0;

wss.on("connection", (socket) => {
  userCount += 1;
  console.log(`#${userCount} user has connected`);

  socket.on("message", (e) => {
    if (e.toString() === "ping") {
      socket.send("pong");
    } else {
      socket.send("please send ping not other things.");
    }
  });
});
