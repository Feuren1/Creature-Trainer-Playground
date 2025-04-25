import { Server } from "socket.io";
import { Attack } from "../types/game/creature";
import { BattleState } from "../game/battlePvP/battleState.js";
import { User } from "../types/user";
import { BattleService } from "../services/battleService.js"

const battleService: BattleService = new BattleService ();
const battle: BattleState = new BattleState();
const currentBattles: Map<string, {battle: BattleState, p1: User, p2: User}> = new Map();


function loadBattleData(p1: User, p2: User){
  
}

export function setupBattleSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("attack", async (data: Attack, callback) => { 
      const team = await battleService.getTeamByPlayerId2("aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1")
      team.map((element) => console.log("DB Response" + element.nickName))
      console.log("Message from client:", data);
      socket.emit("NewBattleState", battle);
      /* callback(battle);  */
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
