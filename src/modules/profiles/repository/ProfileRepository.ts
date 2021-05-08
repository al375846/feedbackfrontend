import { AxiosResponse } from "axios";

import { Category, CategoryRaw } from "../../../entities/Category";
import { CATEGORY, SUGGESTION, SUGGESTION_DELETE } from "./ProfileEndpoint";
import api from "../../../api/Api";
import { Suggestion } from "../../../entities/Suggestion";

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
}