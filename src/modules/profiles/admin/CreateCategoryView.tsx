import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Category } from '../../../entities/Category'
import CategoryCreate from './components/CategoryCreate'
import { CategoryCreateInput } from './CreateCategoryDataContainer'

interface CreateCategoryViewProps {
    isAddingCategory: boolean,
    onShowChange: (show: boolean) => void,
    register: UseFormRegister<CategoryCreateInput>, 
    handleSubmit: UseFormHandleSubmit<CategoryCreateInput>,
    onSubmit: (data: CategoryCreateInput) => void,
    categories: Category[] | undefined
}

const CreateCategoryView: FunctionComponent<CreateCategoryViewProps> = (
    {
        isAddingCategory,
        onShowChange,
        register, 
        handleSubmit,
        onSubmit,
        categories
    }
) => {
    return (
        <CategoryCreate 
            isAddingCategory={isAddingCategory}
            onShowChange={onShowChange}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            categories={categories}/>
    )
}

export default CreateCategoryView
