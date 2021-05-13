export interface Category {
    id: number,
    name: string,
    description: string,
    subcategories: SubCategory[]
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