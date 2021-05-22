import { CategoryRaw, Category } from "../../../entities/Category";
import { Feedback } from "../../../entities/Feedback";
import { Publication } from "../../../entities/Publication";
import { Rate } from "../../../entities/Rate";

export interface PublicationGetParams {
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

export interface PublicationInfoResponseData {
    publication: Publication
}

export interface CategoriesRawResponseData {
    categories: CategoryRaw[]
}

export interface CategoriesResponseData {
    categories: Category[]
}

export interface RatingResponseData {
    rating: Rate
}

export interface PublicationFeedbackResponseData {
    feedbacks: Feedback[]
}

export interface PostFeedbackResponseData {
    feedback: Feedback
}