import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'
import { Category, CategoryCreateInput, CategoryCreateOptions } from '../../../entities/Category'
import { ProfileRepository } from '../repository/ProfileRepository'
import CreateCategoryView from './CreateCategoryView'

const CreateCategoryDataContainer = () => {

    const [ isAddingCategory, setIsAddingCategory ] = useState<boolean>(false)
    const { register, handleSubmit, reset, watch } = useForm<CategoryCreateInput>()
    const parentCategory = watch('parent')
    const categoryadmin = useContext(CategoryAdminContext)
    const repository = new ProfileRepository()

    const onShowChange = (show: boolean) => setIsAddingCategory(show)

    const handleCreate = () => {
        onShowChange(false)
        reset({ name: '', description: '' })
    }

    const onSubmit = (data: CategoryCreateInput) => {

        const categoryData = {
            name: data.name,
            description: data.description,
            parent: parentCategory === CategoryCreateOptions.DEFAULT || !parentCategory
                ? null 
                : {name: parentCategory }
        }

        repository.postCategory(categoryData)
        .then(res => {
            if (!parentCategory) {
                const category: Category = {
                    id: res.data.category.id,
                    name: res.data.category.name, 
                    description: res.data.category.description,
                    subcategories: []
                }
                const newCategories = [...categoryadmin.categories || [], category]
                categoryadmin.onCategoriesChange(newCategories)
            }
            else
                categoryadmin.categories
                    ?.find(cat => cat.name === parentCategory)?.subcategories
                    ?.push(res.data.category)
                categoryadmin.onCategoriesChange([...categoryadmin.categories || []])
        })
        .catch(err => window.alert(err))
        .finally(() => handleCreate())
    }

    return (
        <CreateCategoryView 
            isAddingCategory={isAddingCategory}
            onShowChange={onShowChange}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            categories={categoryadmin.categories}/>
    )
}

export default CreateCategoryDataContainer