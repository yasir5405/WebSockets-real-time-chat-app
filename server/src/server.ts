import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 5000 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    if (parsedMessage.type == "join") {
      allSockets = allSockets.filter((x) => x.socket !== socket);

      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
      socket.send("joined");
      console.log(allSockets);
    }

    if (parsedMessage.type == "chat") {
      const currentUserRoom = allSockets.find((x) => x.socket == socket);
      allSockets.forEach((s) => {
        if (s.room == currentUserRoom?.room) {
          s.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter((x) => x.socket != socket);
  });
});
