import { AxiosResponse } from "axios";

import { Category, CategoryRaw, SubCategory } from "../../../entities/Category";
import { CATEGORY, CATEGORY_EXPERT, CATEGORY_LIST, CATEGORY_LIST_EXPERT, CATEGORY_LIST_RAW, CHANGE_PASSWORD, CHECK_PASSWORD, HISTORY, SUGGESTION, SUGGESTION_DELETE, USER } from "./ProfileEndpoint";
import api from "../../../api/Api";
import { Suggestion } from "../../../entities/Suggestion";
import { History } from "../../../entities/History";
import { User } from "../../../entities/User";

export interface UserParams {
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

export interface SuggestionParams {
    name: string,
    type: string,
    description: string,
    parent: null | { name: string },
    date: Date
}

interface CategoriesResponseData {
    categories: Category[]
}

interface CategoryResponseData {
    category: CategoryRaw
}

interface SuggestionsResponseData {
    suggestions: Suggestion[]
}

interface CategoriesRawResponseData {
    categories: CategoryRaw[]
}

interface CategoriesExpertResponseData {
    favCategories: SubCategory[]
}

interface CategoriesFavouriteResponseData {
    favCategory: SubCategory
}

interface HistoryResponseData {
    history: History[]
}

interface UserResponseData {
    user: User
}

interface CheckPasswordResponseData {
    correct: boolean
}

export class ProfileRepository {
    public async getCategories(token: string): Promise<AxiosResponse<CategoriesResponseData>> {
        return await api.get<CategoriesResponseData>(CATEGORY, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postCategory(categoryData: CategoryPostParams, token: string): Promise<AxiosResponse<CategoryResponseData>> {
        return await api.post<CategoryResponseData>(CATEGORY, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getSuggestions(token: string): Promise<AxiosResponse<SuggestionsResponseData>> {
        return await api.get<SuggestionsResponseData>(SUGGESTION, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async deleteSuggestion(id: number, token: string): Promise<AxiosResponse<void>> {
        return await api.delete<void>(SUGGESTION_DELETE.replace(':id', id.toString()), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getCategoriesRaw(token: string): Promise<AxiosResponse<CategoriesRawResponseData>> {
        return await api.get<CategoriesRawResponseData>(CATEGORY_LIST_RAW, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getCategoriesExpert(token: string): Promise<AxiosResponse<CategoriesExpertResponseData>> {
        return await api.get<CategoriesExpertResponseData>(CATEGORY_LIST_EXPERT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postCategoryFavourite(id:number, token: string): Promise<AxiosResponse<CategoriesFavouriteResponseData>> {
        return await api.post<CategoriesFavouriteResponseData>(CATEGORY_EXPERT.replace(':id', id.toString()), {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async deleteCategoryFavourite(id:number, token: string): Promise<AxiosResponse<void>> {
        return await api.delete<void>(CATEGORY_EXPERT.replace(':id', id.toString()), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getHistory(type: string, token: string): Promise<AxiosResponse<HistoryResponseData>> {
        return await api.get<HistoryResponseData>(HISTORY.replace(':type', type), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getUser(token: string): Promise<AxiosResponse<UserResponseData>> {
        return await api.get<UserResponseData>(USER, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async putUser(userData: UserParams, token: string): Promise<AxiosResponse<UserResponseData>> {
        return await api.put<UserResponseData>(USER, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async deleteUser(token: string): Promise<AxiosResponse<void>> {
        return await api.delete<void>(USER, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async checkPassword(passwordData: CheckPasswordParams, token: string): Promise<AxiosResponse<CheckPasswordResponseData>> {
        return await api.post<CheckPasswordResponseData>(CHECK_PASSWORD, passwordData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async changePassword(changeData: ChangePasswordParams, token: string): Promise<AxiosResponse<void>> {
        return await api.post<void>(CHANGE_PASSWORD, changeData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postSuggestion(suggestionData: SuggestionParams, token: string): Promise<AxiosResponse<void>> {
        return await api.post<void>(SUGGESTION, suggestionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}