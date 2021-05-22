import { AxiosResponse } from "axios"
import api from "../../../api/Api"
import { CATEGORY_LIST, FAV_CATEGORY, FAV_CATEGORY_LIST } from "./FavcategoriesEndpoit"
import { CategoriesExpertGetResponse, CategoriesFavouriteDeleteResponse, CategoriesFavouritePostResponse, CategoriesRawGetResponse } from "./FavcategoriesRequestTypes"

export class FavCategoriesRepository {

    public async getCategoriesRaw(): Promise<AxiosResponse<CategoriesRawGetResponse>> {
        return await api.get<CategoriesRawGetResponse>(CATEGORY_LIST)
    }

    public async getCategoriesExpert(): Promise<AxiosResponse<CategoriesExpertGetResponse>> {
        return await api.get<CategoriesExpertGetResponse>(FAV_CATEGORY_LIST)
    }

    public async postCategoryFavourite(id: string): Promise<AxiosResponse<CategoriesFavouritePostResponse>> {
        return await api.post<CategoriesFavouritePostResponse>(FAV_CATEGORY.replace(':id', id))
    }

    public async deleteCategoryFavourite(id: string): Promise<AxiosResponse<CategoriesFavouriteDeleteResponse>> {
        return await api.delete<CategoriesFavouriteDeleteResponse>(FAV_CATEGORY.replace(':id', id))
    }

}