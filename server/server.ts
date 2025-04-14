import express from "express";
import db from "./db.js";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";
import { RegisterUser } from "./types/user.js";
import  bcrypt  from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("[SERVER] Serving index.html");
  res.sendFile(join(__dirname, "../../index.html"));
});

app.post("/register", async (req, res) => {
  console.log("[SERVER] Trying to register user...");
  const user: RegisterUser = req.body;

  if (!user.email || !user.password || !user.username) {
    res.status(400).send("Missing Information");
    return
  }

  try {
  const { rows: emailExists } = await db.query(
    "SELECT * FROM users WHERE email = $1", // SQL query with a placeholder
    [user.email] // Parameterized value
  );

  if (emailExists.length > 0) {
    console.log(emailExists[0])
    res.status(400).send("Email already exists");
    return
  }

  const { rows: userNameExsists } = await db.query(
    "SELECT * FROM users WHERE username = $1", // SQL query with a placeholder
    [user.username] // Parameterized value
  );
  if (userNameExsists.length > 0) {
    console.log(userNameExsists[0])
    res.status(400).send("Username already exists");
    return
  }

  const hashedPassword = await bcrypt.hash(user.password, 15);
  const { rows: createdUser } = await db.query(
    `INSERT INTO users (username, password_hash, email) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [user.username, hashedPassword, user.email]
  );
  const { password_hash, ...userWithoutPassword } = createdUser[0];
  res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  } 
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true,
  })
);

/* io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log("Message from client:", data);
    socket.emit("message", "Hello from server");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
}); */
