import { AxiosResponse } from "axios";

import { CATEGORY, CHANGE_PASSWORD, CHECK_PASSWORD, HISTORY, SUGGESTION, SUGGESTION_DELETE, USER } from "./ProfileEndpoint";
import api from "../../../api/Api";
import { CategoriesGetResponse, CategoryPostParams, CategoryPostResponse, HistoryGetResponse, SuggestionsDeleteResponse, SuggestionsGetResponse, UserResponse, UserPutParams, UserDeleteResponse, CheckPasswordResponse, CheckPasswordParams, ChangePasswordParams, ChangePasswordResponse } from "./ProfileRequestType";

export class ProfileRepository {

    public async getCategories(): Promise<AxiosResponse<CategoriesGetResponse>> {
        return await api.get<CategoriesGetResponse>(CATEGORY)
    }

    public async postCategory(categoryData: CategoryPostParams): Promise<AxiosResponse<CategoryPostResponse>> {
        return await api.post<CategoryPostResponse>(CATEGORY, categoryData)
    }

    public async getSuggestions(): Promise<AxiosResponse<SuggestionsGetResponse>> {
        return await api.get<SuggestionsGetResponse>(SUGGESTION)
    }

    public async deleteSuggestion(id: string): Promise<AxiosResponse<SuggestionsDeleteResponse>> {
        return await api.delete<SuggestionsDeleteResponse>(SUGGESTION_DELETE.replace(':id', id))
    }

    public async getHistory(type: string): Promise<AxiosResponse<HistoryGetResponse>> {
        return await api.get<HistoryGetResponse>(HISTORY.replace(':type', type))
    }

    public async getUser(): Promise<AxiosResponse<UserResponse>> {
        return await api.get<UserResponse>(USER)
    }

    public async putUser(userData: UserPutParams): Promise<AxiosResponse<UserResponse>> {
        return await api.put<UserResponse>(USER, userData)
    }

    public async deleteUser(): Promise<AxiosResponse<UserDeleteResponse>> {
        return await api.delete<UserDeleteResponse>(USER)
    }

    public async checkPassword(passwordData: CheckPasswordParams): Promise<AxiosResponse<CheckPasswordResponse>> {
        return await api.post<CheckPasswordResponse>(CHECK_PASSWORD, passwordData)
    }

    public async changePassword(changeData: ChangePasswordParams): Promise<AxiosResponse<ChangePasswordResponse>> {
        return await api.post<ChangePasswordResponse>(CHANGE_PASSWORD, changeData)
    }
}