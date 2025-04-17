import db from "../db.js"
import { Creature } from "../types/game/creature.js"

export class BattleService {

    async getTeamByPlayerId(userId: string) {
        //ORM? queries would be insane
        /* const { rows: creatures } = await db.query(`Select * FROM teams where playerid = $1 AND isactive = true`,
        [userId])
        return creatures[0] */
    }
}
