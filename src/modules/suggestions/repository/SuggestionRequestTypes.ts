import { Category } from "../../../entities/Category";
import { Suggestion } from "../../../entities/Suggestion";

export interface SuggestionCategoriesResponse {
    categories: Category[]
}

export interface SuggestionPostParams {
    name: string,
    type: string,
    description: string,
    parent: null | { name: string },
    date: Date
}

export interface SuggestionPostResponse {
    suggestion: Suggestion
}