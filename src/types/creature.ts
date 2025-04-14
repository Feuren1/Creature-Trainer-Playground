import { Attack } from "./attack.ts";
import { Element } from "./element.ts";
export type Creature = {
    name: string
    element: Element;
    level: number;
    currentHp: number;
    attacks: Attack[]
}