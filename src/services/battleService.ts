

export class BattleService {
    /* teamP1: BehaviorSubject<Creature[]>;
    teamP2: BehaviorSubject<Creature[]>; */
    socket: WebSocket;

    
    constructor(){
    this.socket = new WebSocket('ws://localhost:3000');
    
    }
}