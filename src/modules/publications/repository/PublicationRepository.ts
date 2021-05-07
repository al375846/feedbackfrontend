import { AxiosResponse } from "axios";

import { Publication } from "../../../entities/Publication";
import api from "../../../api/Api";
import { Category, CategoryRaw } from "../../../entities/Category";
import { CATEGORY_LIST, CATEGORY_LIST_RAW, FEEDBACK_FILE, FEEDBACK_POST, FEEDBACK_RATE, FILE, INCIDENCE, PUBLICATION, PUBLICATION_FEEDBACK, PUBLICATION_FILE, PUBLICATION_INFO, PUBLICATION_LIST_CATEGORY, PUBLICATION_LIST_EXPERT } from "./PublicationEndpoints";
import { Rate } from "../../../entities/Rate";
import { Feedback } from "../../../entities/Feedback";


export interface PublicationGetParams {
    cursor: number,
    page: number,
    filter: string
}

export interface PublicationPostParams {
    title: string,
    category: {name: string},
    tags: Array<string>,
    description: string,
    date: Date
}

export interface RatePostParams {
    grade: number,
    date: Date
}

export interface RatePutParams {
    grade: number
}

export interface PostFeedbackParams {
    description: string,
    date: Date
}

export interface PublicationResponseData {
    itemSize: number,
    leftSize: number,
    publications: Publication[]
}

export interface IncidenceParams {
    type: string,
    description: string
}

interface PublicationInfoResponseData {
    publication: Publication
}

interface CategoriesRawResponseData {
    categories: CategoryRaw[]
}

interface CategoriesResponseData {
    categories: Category[]
}

interface RatingResponseData {
    rating: Rate
}

interface PublicationFeedbackResponseData {
    feedbacks: Feedback[]
}

interface PostFeedbackResponseData {
    feedback: Feedback
}

export class PublicationRepository {

    public async findById(id: string, token: string): Promise<AxiosResponse<PublicationInfoResponseData>> {
        return await api.get<PublicationInfoResponseData>(PUBLICATION_INFO.replace(':id', id), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async findAll(getparams: PublicationGetParams, token: string): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get<PublicationResponseData>(PUBLICATION, {
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
        return await api.get<PublicationResponseData>(PUBLICATION_LIST_CATEGORY.replace(':id', id.toString()), {
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
        return await api.get<PublicationResponseData>(PUBLICATION_LIST_EXPERT, {
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
        return await api.post<PublicationInfoResponseData>(PUBLICATION, postparams, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postPublicationFiles(id:number, files: FormData, token: string): Promise<void> {
        await api.post<void>(PUBLICATION_FILE.replace(':id', id.toString()), files, {
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

    public async getCategories(token: string): Promise<AxiosResponse<CategoriesResponseData>> {
        return await api.get<CategoriesResponseData>(CATEGORY_LIST, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async rateFeedback(id: number, postParams: RatePostParams, token: string): Promise<AxiosResponse<RatingResponseData>> {
        return await api.post<RatingResponseData>(FEEDBACK_RATE.replace(':id', id.toString()), postParams, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async updateRateFeedback(id: number, postParams: RatePutParams, token: string): Promise<AxiosResponse<RatingResponseData>> {
        return await api.put<RatingResponseData>(FEEDBACK_RATE.replace(':id', id.toString()), postParams, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getPublicationFeedbacks(publicationId: number, token: string): Promise<AxiosResponse<PublicationFeedbackResponseData>> {
        return await api.get<PublicationFeedbackResponseData>(PUBLICATION_FEEDBACK.replace(':id', publicationId.toString()), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postPublicationFeedback(publicationId: number, feedbacakData: PostFeedbackParams, token: string): Promise<AxiosResponse<PostFeedbackResponseData>> {
        return await api.post<PostFeedbackResponseData>(FEEDBACK_POST.replace(':id', publicationId.toString()), feedbacakData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postFeedbackFiles(id: number, files: FormData, token: string): Promise<void> {
        await api.post<void>(FEEDBACK_FILE.replace(':id', id.toString()), files, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async postIncidence(id: string, incidenceData: IncidenceParams, token: string): Promise<void> {
        await api.post<void>(INCIDENCE.replace(':id', id.toString()), incidenceData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    public async getFile(filename: string, token: string): Promise<AxiosResponse> {
        return await api.get(FILE.replace(':filename', filename), {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
            })
    }
}
