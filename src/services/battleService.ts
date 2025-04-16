import { Socket } from "socket.io-client";
import { Attack } from "../types/attack";
import { EventEmitter } from "pixi.js";
import { AttackResponse } from "../types/battle/actionResponse";

export class BattleService extends EventEmitter {

  socket: Socket;
  constructor(socket: Socket) {
    super();
    this.socket = socket;
  }

  sendAttack(attack: Attack) {
    return new Promise((resolve, reject) => {
        this.socket.emit("attack", attack, (response: AttackResponse & { error?: string }) => {
            if(response.error) {
                reject(new Error(response.error));
            } else{
                resolve(response);
            }
        });
    });
  }
  sendAction() {}
}
