import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { BattleState } from "./game/battlePvP/battleState.js";
import authRoutes from "./routes/auth/index.js";
import { setupBattleSocket } from "./sockets/pvpBattleSocket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
/* For the future: */
/* if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
} */

app.use(express.json());
app.use("/", authRoutes);
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true,
  })
);
setupBattleSocket(io)
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
