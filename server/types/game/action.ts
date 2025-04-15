export enum ActionType {
  ATTACK = "ATTACK",
  ITEM = "ITEM",
  SWITCH_CREATURE = "SWITCH_CREATURE",
}

// Base action interface
export interface Action {
    playerId: string; 
    playerName: string;
    type: ActionType;
  }

export interface AttackAction extends Action {
    type: ActionType.ATTACK; 
    creatureId: string;
    moveId: string; 
  }
  
  export interface ItemAction extends Action {
    type: ActionType.ITEM;
    itemId: string;
    targetCreatureId?: string; 
  }
  
  export interface SwitchCreatureAction extends Action {
    type: ActionType.SWITCH_CREATURE;
    creatureId: string;
  }