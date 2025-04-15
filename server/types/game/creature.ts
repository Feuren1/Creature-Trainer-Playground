export enum Element {
    WATER="WATER",
    FIRE="FIRE",
    GRASS="GRASS"
}

export type Creature = {
    creature_id: string
    hp: string
    atk: number
    def: number
    speed: number
    attack1: Attack
    attack2: Attack
    attack3: Attack
    attack4: Attack
    isActive: boolean
}

export type Attack = {
    id: string
    name: string
    strength: number
    element: Element
}