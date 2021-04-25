import React, { useState } from 'react'
import { Category } from '../entities/Category'

export interface CategoryAdminData {
    categories: Category[] | undefined,
    onCategoriesChange: (categories: Category[]) => void
}

const CategoryAdminContext = React.createContext<CategoryAdminData>({
    categories: [], onCategoriesChange: () => null
})

export const CategoryAdminProvaider = CategoryAdminContext.Provider

export interface CategoryAdminStoreProps {
    children: JSX.Element
}

export const CategoryAdminStore = (props: CategoryAdminStoreProps) => {
    const [categories, setCategories] = useState<Category[]>()

    const onCategoriesChange = (categories: Category[]) => {
        setCategories(categories)
    }

    return (
        <CategoryAdminContext.Provider value={{categories: categories, onCategoriesChange: onCategoriesChange}}>
            {props.children}
        </CategoryAdminContext.Provider>
    )
}

export default CategoryAdminContext