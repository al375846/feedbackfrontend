import { Publication } from "./Publication";

export interface Feedback {
    id: number,
    publication: Publication
    description: string,
    videos: Array<string>,
    documents: Array<string>,
    images: Array<string>,
    expert: {username: string},
    date: Date
}