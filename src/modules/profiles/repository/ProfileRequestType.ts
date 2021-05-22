import { Category, CategoryRaw } from "../../../entities/Category";
import { History } from "../../../entities/History";
import { Suggestion } from "../../../entities/Suggestion";
import { User } from "../../../entities/User";

export interface UserPutParams {
    username: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

export interface CategoryPostParams {
    name: string,
    description: string,
    parent: null | { name: string }
}

export interface CheckPasswordParams {
    password: string
}

export interface ChangePasswordParams {
    oldPassword: string,
    newPassword: string
}

export interface CategoriesGetResponse {
    categories: Category[]
}

export interface CategoryPostResponse {
    category: CategoryRaw
}

export interface SuggestionsGetResponse {
    suggestions: Suggestion[]
}

export interface SuggestionsDeleteResponse {
    done: true
}

export interface HistoryGetResponse {
    history: History[]
}

export interface UserResponse {
    user: User
}

export interface UserDeleteResponse {
    done: boolean
}

export interface CheckPasswordResponse {
    correct: boolean
}

export interface ChangePasswordResponse {
    done: boolean
}