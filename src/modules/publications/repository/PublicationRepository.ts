import { AxiosResponse } from "axios";

import api from "../../../api/Api";
import { CATEGORY_LIST, CATEGORY_LIST_RAW, FEEDBACK_FILE, FEEDBACK_POST, FEEDBACK_RATE, FILE, INCIDENCE, PUBLICATION, PUBLICATION_FEEDBACK, PUBLICATION_FILE, PUBLICATION_INFO, PUBLICATION_LIST_CATEGORY, PUBLICATION_LIST_EXPERT } from "./PublicationEndpoints";
import { PublicationInfoResponseData, PublicationGetParams, PublicationResponseData, PublicationPostParams, CategoriesRawResponseData, CategoriesResponseData, RatePostParams, RatingResponseData, RatePutParams, PublicationFeedbackResponseData, PostFeedbackParams, PostFeedbackResponseData, IncidenceParams } from "./PublicationRequestType";

export class PublicationRepository {

    public async findById(id: string): Promise<AxiosResponse<PublicationInfoResponseData>> {
        return await api.get<PublicationInfoResponseData>(PUBLICATION_INFO.replace(':id', id))
    }

    public async findAll(getparams: PublicationGetParams): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get<PublicationResponseData>(PUBLICATION, {
            params: {
                page: getparams.page,
                filter: getparams.filter
            }
        })
    }

    public async findAllByCategory(id: string, getparams: PublicationGetParams): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get<PublicationResponseData>(PUBLICATION_LIST_CATEGORY.replace(':id', id), {
            params: {
                page: getparams.page,
                filter: getparams.filter
            }
        })
    }

    public async findAllByExpert(getparams: PublicationGetParams): Promise<AxiosResponse<PublicationResponseData>> {
        return await api.get<PublicationResponseData>(PUBLICATION_LIST_EXPERT, {
            params: {
                page: getparams.page,
                filter: getparams.filter
            }
        })
    }

    public async postPublication(postparams: PublicationPostParams): Promise<AxiosResponse<PublicationInfoResponseData>> {
        return await api.post<PublicationInfoResponseData>(PUBLICATION, postparams)
    }

    public async postPublicationFiles(id: string, files: FormData): Promise<void> {
        await api.post<void>(PUBLICATION_FILE.replace(':id', id), files)
    }

    public async getCategoriesRaw(): Promise<AxiosResponse<CategoriesRawResponseData>> {
        return await api.get<CategoriesRawResponseData>(CATEGORY_LIST_RAW)
    }

    public async getCategories(): Promise<AxiosResponse<CategoriesResponseData>> {
        return await api.get<CategoriesResponseData>(CATEGORY_LIST)
    }

    public async rateFeedback(id: string, postParams: RatePostParams): Promise<AxiosResponse<RatingResponseData>> {
        return await api.post<RatingResponseData>(FEEDBACK_RATE.replace(':id', id), postParams)
    }

    public async updateRateFeedback(id: string, postParams: RatePutParams): Promise<AxiosResponse<RatingResponseData>> {
        return await api.put<RatingResponseData>(FEEDBACK_RATE.replace(':id', id), postParams)
    }

    public async getPublicationFeedbacks(id: string): Promise<AxiosResponse<PublicationFeedbackResponseData>> {
        return await api.get<PublicationFeedbackResponseData>(PUBLICATION_FEEDBACK.replace(':id', id))
    }

    public async postPublicationFeedback(id: string, feedbacakData: PostFeedbackParams): Promise<AxiosResponse<PostFeedbackResponseData>> {
        return await api.post<PostFeedbackResponseData>(FEEDBACK_POST.replace(':id', id), feedbacakData)
    }

    public async postFeedbackFiles(id: string, files: FormData): Promise<void> {
        await api.post<void>(FEEDBACK_FILE.replace(':id', id), files)
    }

    public async postIncidence(id: string, incidenceData: IncidenceParams): Promise<void> {
        await api.post<void>(INCIDENCE.replace(':id', id), incidenceData)
    }

    public async getFile(filename: string): Promise<AxiosResponse> {
        return await api.get(FILE.replace(':filename', filename), {
            responseType: 'blob'
            })
    }
}
