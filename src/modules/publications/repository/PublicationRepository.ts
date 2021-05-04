import { AxiosResponse } from "axios";

import { Publication } from "../../../entities/Publication";
import api from "../../../api/Api";

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

export class PublicationRepository {

    public async findById(id: string, token: string): Promise<AxiosResponse<Publication>> {
        return await api.get<Publication>(`/api/publication/${id}`, {
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
}
