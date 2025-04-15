import { Creature } from "../creature";

export interface AttackResponse {
    victim: Creature;
    /* attacker: Creature; */
    damageDealt: number;
    /* criticalHit: boolean; */
    beforeHp: number;
    afterHp: number;
    /* message?: string; */
  }