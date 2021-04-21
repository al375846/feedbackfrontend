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

export interface CategoryRaw {
    id: number,
    name: string,
    description: string,
    parent: CategoryRaw | null
}