export interface Publication {
    id: number,
    title: string,
    category: {name: string},
    description: string,
    tags: Array<string>,
    video: Array<string>,
    document: Array<string>,
    images: Array<string>,
    apprentice: {username: string},
    date: Date
}