export enum Element {
    WATER="WATER",
    FIRE="FIRE",
    GRASS="GRASS"
}

export type Creature = {
    id: string
    baseId: string
    nickname:string
    hp: number
    atk: number
    def: number
    spd: number
    level: number
    xp: number
    isActive: boolean
    isFainted: boolean
}

export type CreautureBase = {
    name: string
    baseHp: number
    baseAtk: number
    baseDef: number
    baseSpd: number
    elementId: string
    variant: string
    lore: string
}

export type Attack = {
    id: string
    name: string
    strength: number
    element: Element
}