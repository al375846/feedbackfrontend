import { AxiosResponse } from "axios";

import { Category, CategoryRaw, SubCategory } from "../../../entities/Category";
import { CATEGORY, CATEGORY_EXPERT, CATEGORY_LIST_EXPERT, CATEGORY_LIST_RAW, HISTORY, SUGGESTION, SUGGESTION_DELETE } from "./ProfileEndpoint";
import api from "../../../api/Api";
import { Suggestion } from "../../../entities/Suggestion";
import { History } from "../../../entities/History";

export interface CategoryPostParams {
    name: string,
    description: string,
    parent: null | { name: string }
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
}