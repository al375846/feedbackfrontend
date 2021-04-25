import { SubCategory } from "./Category";

export interface Suggestion {
    id: number,
    name: string,
    description: string,
    parent: SubCategory | null
}