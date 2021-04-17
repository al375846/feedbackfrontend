import { Publication } from "./Publication";

export interface Feedback {
    id: number,
    publication: Publication
    description: string,
    video: Array<string>,
    document: Array<string>,
    images: Array<string>,
    expert: {username: string},
    date: Date
}