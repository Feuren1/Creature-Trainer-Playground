import { Element } from "./element.ts";
export type Attack = {
    id: string;
    name: string;
    strength: number;
    element: Element;
}