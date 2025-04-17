import { Trainer } from "../../types/user";
import { Action, ActionType } from "../../types/game/action.js";
import { Creature,Element } from "../../types/game/creature.js";

export class BattleState {
  /* battleId: number;
  player1: Trainer;
  player2: Trainer; */
  creaturesPlayer1: Creature[] = [];
  creaturesPlayer2: Creature[] = [];
  turn: number;
  whoHasTurn: "P1" | "P2";
  constructor() {
    this.creaturesPlayer1 = [{
      creature_id: "1",
      hp: "80",
      atk: 60,
      def: 65,
      speed: 50,
      attack1: {
        id: "1",
        name: "Attack1",
        strength: 70,
        element: Element.WATER
      },
      attack2: {
        id: "2",
        name: "Attack1",
        strength: 50,
        element: Element.WATER
      },
      attack3: {
        id: "3",
        name: "Attack1",
        strength: 60,
        element: Element.WATER
      },
      attack4: {
        id: "4",
        name: "Attack1",
        strength: 65,
        element: Element.WATER
      },
      isActive: true
    },{
      creature_id: "1",
      hp: "80",
      atk: 60,
      def: 65,
      speed: 50,
      attack1: {
        id: "1",
        name: "Attack1",
        strength: 70,
        element: Element.WATER
      },
      attack2: {
        id: "2",
        name: "Attack1",
        strength: 50,
        element: Element.WATER
      },
      attack3: {
        id: "3",
        name: "Attack1",
        strength: 60,
        element: Element.WATER
      },
      attack4: {
        id: "4",
        name: "Attack1",
        strength: 65,
        element: Element.WATER
      },
      isActive: true
    }];
    this.creaturesPlayer2 = [{
      creature_id: "1",
      hp: "80",
      atk: 60,
      def: 65,
      speed: 50,
      attack1: {
        id: "1",
        name: "Attack1",
        strength: 70,
        element: Element.WATER
      },
      attack2: {
        id: "2",
        name: "Attack1",
        strength: 50,
        element: Element.WATER
      },
      attack3: {
        id: "3",
        name: "Attack1",
        strength: 60,
        element: Element.WATER
      },
      attack4: {
        id: "4",
        name: "Attack1",
        strength: 65,
        element: Element.WATER
      },
      isActive: true
    },{
      creature_id: "1",
      hp: "80",
      atk: 60,
      def: 65,
      speed: 50,
      attack1: {
        id: "1",
        name: "Attack1",
        strength: 70,
        element: Element.WATER
      },
      attack2: {
        id: "2",
        name: "Attack1",
        strength: 50,
        element: Element.WATER
      },
      attack3: {
        id: "3",
        name: "Attack1",
        strength: 60,
        element: Element.WATER
      },
      attack4: {
        id: "4",
        name: "Attack1",
        strength: 65,
        element: Element.WATER
      },
      isActive: true
    }];
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
