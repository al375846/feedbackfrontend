import { AxiosResponse } from "axios"
import api from "../../../api/Api"
import { SuggestionCategoriesResponse, SuggestionPostParams, SuggestionPostResponse } from './SuggestionRequestTypes'
import { CATEGORY_LIST, SUGGESTION_POST } from './SuggestionEndpoint'

export class SuggestionRepository {

    public async getCategories(): Promise<AxiosResponse<SuggestionCategoriesResponse>> {
        return await api.get<SuggestionCategoriesResponse>(CATEGORY_LIST)
    }

    public async postSuggestion(suggestionData: SuggestionPostParams): Promise<AxiosResponse<SuggestionPostResponse>> {
        return await api.post<SuggestionPostResponse>(SUGGESTION_POST, suggestionData)
    }

}
