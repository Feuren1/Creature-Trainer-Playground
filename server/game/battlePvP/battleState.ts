import { Action, ActionType, AttackAction } from "../../types/game/action.js";
import { Attack, Creature, Element } from "../../types/game/creature.js";
type player = {
  creatures: Creature[];
};

export class BattleState {
  /* battleId: number;
  player1: Trainer;
  player2: Trainer;  */
  winner: "P1"|"P2"|"tbd";
  teamPlayer1: player = {
    creatures: [
      {
        id: "1",
        baseId: "2",
        nickname: "Salamander",
        hp: 80,
        atk: 75,
        def: 60,
        spd: 65,
        level: 50,
        xp: 0,
        isActive: true,
        isFainted: false,
      },
      {
        id: "2",
        baseId: "3",
        nickname: "Lavamuth",
        hp: 100,
        atk: 60,
        def: 85,
        spd: 55,
        level: 50,
        xp: 0,
        isActive: true,
        isFainted: false,
      },
    ]
  };
  teamPlayer2: player = {
    creatures: [
      {
        id: "3",
        baseId: "4",
        nickname: "Terror",
        hp: 90,
        atk: 80,
        def: 70,
        spd: 50,
        level: 50,
        xp: 0,
        isActive: true,
        isFainted: false
      },
      {
        id: "2",
        baseId: "3",
        nickname: "Lavamuth",
        hp: 100,
        atk: 60,
        def: 85,
        spd: 55,
        level: 50,
        xp: 0,
        isActive: true,
        isFainted: false
      },
    ]
  };
  turn: number;
  whoHasTurn: "P1" | "P2";

  constructor() {
    this.turn = 0;
    this.whoHasTurn = this.whoMovesFirst();
    this.winner="tbd";
  }

  whoMovesFirst(): "P1" | "P2" {
    const activeCreauteP1 = this.getActiveCreauteP1();
    const activeCreauteP2 = this.getActiveCreauteP2();
    if (activeCreauteP1 && activeCreauteP2)
      if (activeCreauteP1.spd > activeCreauteP2.spd) {
        return "P1";
      } else if (activeCreauteP1.spd === activeCreauteP2.spd) {
        return Math.random() < 0.5 ? "P1" : "P2";
      }
    return "P2";
  }

  handleTurn(actionP1: Attack, actionP2: Attack) {
    const movesFirst = this.whoMovesFirst();

    if (movesFirst === "P1") {
      this.applyDamage(this.getActiveCreauteP1(), actionP1, this.getActiveCreauteP2());
      this.isBattleOver();
      this.applyDamage(this.getActiveCreauteP2(), actionP2, this.getActiveCreauteP1());
    }
    if (movesFirst === "P2") {
      this.applyDamage(this.getActiveCreauteP2(), actionP2, this.getActiveCreauteP1());
      this.applyDamage(this.getActiveCreauteP1(), actionP1, this.getActiveCreauteP2());
    }
  }

  applyDamage(attacker: Creature, attack: Attack, target: Creature){
    target.hp -= attacker.atk + attack.strength;
    if (target.hp < 0) {
      target.isFainted == true;
    }
  }

  isBattleOver(){
    const p1Lost = this.teamPlayer1?.creatures.find((c) => !c.isFainted);
    const p2Lost = this.teamPlayer2?.creatures.find((c) => !c.isFainted);
    if (p1Lost) {
      this.winner = "P2";
    }
    if (p2Lost) {
      this.winner = "P1";
    }
  }

  getNoOfLivingCreatures(p:"P1"|"P2"): number|undefined{
    if(p==="P1"){
      return this.teamPlayer1.creatures.filter((creature)=> !creature.isFainted).length
    }
    if(p==="P2"){
      return this.teamPlayer2.creatures.filter((creature)=> !creature.isFainted).length
    }
  }
  
  /* Carefull with ! statement but should be made sure its ! somewhere else */
  getActiveCreauteP1() {
    return this.teamPlayer1.creatures.find((c) => c.isActive)!;
  }

  getActiveCreauteP2() {
    return this.teamPlayer2.creatures.find((c) => c.isActive)!;
  }
}
