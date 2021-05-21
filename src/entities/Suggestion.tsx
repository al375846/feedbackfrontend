import { SubCategory } from "./Category";

export interface Suggestion {
    id: number,
    type: string,
    name: string,
    description: string,
    parent: SubCategory | null,
    date: Date
}

export type SuggestionCreateInput = {
    name: string,
    description: string,
    type: string,
    category: string
}

export enum SuggestionTypes {
    CATEGORY = 'category',
    UPGRADE = 'upgrade'
}