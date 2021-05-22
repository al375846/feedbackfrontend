import { isExpert } from "../contexts/CredentialsContext"

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

export type CategoryCreateInput = {
    parent: string,
    name: string,
    description: string
}

export enum CategoryCreateOptions {
    DEFAULT = "category"
}

export enum PublicationCategories {
    ALL = -2,
    FAVOURITE = -1
}

export const isCustomCategory = (id: number): boolean => {
    return id !== PublicationCategories.ALL && id !== PublicationCategories.FAVOURITE
}

export const isUserExpert = (type: string): Array<CategoryRaw> => {
    return isExpert(type) ? [categoryFavourite] : []
}

export const categoryAll = {
    id: -2,
    name: 'Todas',
    description:'',
    parent: null
}

export const categoryFavourite = {
    id: -1,
    name: 'Favoritas',
    description:'',
    parent: null
}