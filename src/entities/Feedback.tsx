import { Publication } from "./Publication";
import { Rate } from "./Rate";

export interface Feedback {
    id: number,
    publication: Publication
    description: string,
    video: Array<string>,
    document: Array<string>,
    images: Array<string>,
    expert: {username: string},
    date: Date
    valoration: Rate | null
}