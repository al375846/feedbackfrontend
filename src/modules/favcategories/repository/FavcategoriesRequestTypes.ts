import { CategoryRaw, SubCategory } from "../../../entities/Category";

export interface CategoriesRawGetResponse {
    categories: CategoryRaw[]
}

export interface CategoriesExpertGetResponse {
    favCategories: SubCategory[]
}

export interface CategoriesFavouritePostResponse {
    favCategory: SubCategory
}

export interface CategoriesFavouriteDeleteResponse {
    done: boolean
}