import { Server } from "socket.io";
import { Attack } from "../types/game/creature";

export function setupBattleSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("attack", (data: Attack) => {
      console.log("Message from client:", data);
      socket.emit("message", "Hello from server");
    });

    socket.on("message", (data) => {
      console.log("Message from client:", data);
      socket.emit("message", "Hello from server");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
