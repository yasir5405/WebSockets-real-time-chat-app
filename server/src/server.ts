import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 5000 });

let userCount: number = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);
  userCount += 1;
  console.log(`#${userCount} user has connected`);

  socket.on("message", (e) => {
    // socket.send(`Message sent by me: ${e.toString()}`);
    allSockets.forEach((s) => s.send(`Message received: ${e.toString()}`));
  });
});
