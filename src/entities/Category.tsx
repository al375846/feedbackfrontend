export interface Category {
    id: number,
    name: string,
    description: string,
    children: SubCategory[]
}

export interface SubCategory {
    id: number,
    name: string,
    description: string,
}