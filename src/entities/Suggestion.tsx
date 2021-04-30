import { SubCategory } from "./Category";

export interface Suggestion {
    id: number,
    type: string,
    name: string,
    description: string,
    parent: SubCategory | null,
    date: Date
}