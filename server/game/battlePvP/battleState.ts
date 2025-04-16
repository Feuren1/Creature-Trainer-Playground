import { Trainer } from "../../types/user";
import { Action, ActionType } from "../../types/game/action";
import { Creature } from "../../types/game/creature";

export class BattleState {
  /* battleId: number;
  player1: Trainer;
  player2: Trainer; */
  creaturesPlayer1: Creature[] = [];
  creaturesPlayer2: Creature[] = [];
  turn: number;
  whoHasTurn: "P1" | "P2";
  constructor() {
    this.creaturesPlayer1 = [];
    this.creaturesPlayer2 = [];
    this.turn = 0;
    this.whoHasTurn = this.whoMovesFirst();
  }

  whoMovesFirst(): "P1" | "P2" {
    const activeCreauteP1 = this.getActiveCreauteP1();
    const activeCreauteP2 = this.getActiveCreauteP2();
    if (activeCreauteP1.speed > activeCreauteP2.speed) {
      return "P1";
    } else if (activeCreauteP1.speed === activeCreauteP2.speed) {
      return "P1";
    } else {
      return Math.random() < 0.5 ? "P1" : "P2";
    }
  }

  handleTurn(actionP1: Action, actionP2: Action) {
    if(actionP1.type === ActionType.SWITCH_CREATURE || actionP2.type === ActionType.SWITCH_CREATURE){
      
    }
    this.calculateFirstMove ()
  }

  calculateFirstMove() {
    const creatureP1 = this.getActiveCreauteP1();
    const creatureP2 = this.getActiveCreauteP2();
  }

  getActiveCreauteP1(): Creature {
    return this.creaturesPlayer1.find((c) => c.isActive)!;
  }
  getActiveCreauteP2(): Creature {
    return this.creaturesPlayer2.find((c) => c.isActive)!;
  }
}
