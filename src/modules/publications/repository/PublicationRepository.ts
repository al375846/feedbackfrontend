import { AxiosResponse } from "axios";

import { Publication } from "../../../entities/Publication";
import api from "../../../api/Api";
import { Category, CategoryRaw } from "../../../entities/Category";

interface PublicationGetParams {
    cursor: number,
    page: number,
    filter: string
}

export interface PublicationResponseData {
    itemSize: number,
    leftSize: number,
    publications: Publication[]
}

export interface PublicationPostParams {
    title: string,
    category: {name: string},
    tags: Array<string>,
    description: string,
    date: Date
}

interface PublicationInfoResponseData {
    publication: Publication
}

interface CategoriesRawResponse {
    categories: CategoryRaw[]
}

interface CategoriesResponse {
    categories: Category[]
}

export class PublicationRepository {

    public async findById(id: string, token: string): Promise<AxiosResponse<PublicationInfoResponseData>> {
        return await api.get<PublicationInfoResponseData>(`/api/publication/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async findAll(getparams: PublicationGetParams, token: string): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get('/api/publication', {
            params: {
                cursor: getparams.cursor,
                page: getparams.page,
                filter: getparams.filter
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async findAllByCategory(id: number, getparams: PublicationGetParams, token: string): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get(`/api/publication/category/${id}`, {
            params: {
                cursor: getparams.cursor,
                page: getparams.page,
                filter: getparams.filter
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async findAllByExpert(getparams: PublicationGetParams, token: string): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get('/api/publication/expert', {
            params: {
                cursor: getparams.cursor,
                page: getparams.page,
                filter: getparams.filter
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postPublication(postparams: PublicationPostParams, token: string): Promise<AxiosResponse<PublicationInfoResponseData>> {
        return await api.post('/api/publication', postparams, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postFiles(id:number, files: FormData, token: string): Promise<void> {
        await api.post(`/api/file/publication/${id}`, files, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getCategoriesRaw(token: string): Promise<AxiosResponse<CategoriesRawResponse>> {
        return await api.get('/api/category/raw', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getCategories(token: string): Promise<AxiosResponse<CategoriesResponse>> {
        return await api.get('/api/category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
