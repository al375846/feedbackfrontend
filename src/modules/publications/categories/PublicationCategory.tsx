import { CredentialsUsertype } from "../../../contexts/CredentialsContext"
import { CategoryRaw } from "../../../entities/Category"

export enum PublicationCategories {
    ALL = -2,
    FAVOURITE = -1
}

export const isCustomCategory = (id: number): boolean => {
    return id !== PublicationCategories.ALL && id !== PublicationCategories.FAVOURITE
}

export const isUserExpert = (type: string): Array<CategoryRaw> => {
    return type === CredentialsUsertype.EXPERT ? [categoryFavourite] : []
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