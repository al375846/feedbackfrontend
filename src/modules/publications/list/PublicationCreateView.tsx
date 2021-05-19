import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Category } from '../../../entities/Category'
import { Publication } from '../../../entities/Publication'
import PublicationCreate from './components/PublicationCreate'
import { PublicationCreateInput } from './PublicationCreateDataContainer'

interface PublicationCreateViewProps {
    isAddingPublication: boolean,
    onAddingChange: (adding: boolean) => void,
    handlePost: (publication: Publication) => void,
    loading: boolean,
    onLoadingChange: (loading: boolean) => void,
    register: UseFormRegister<PublicationCreateInput>,
    handleSubmit: UseFormHandleSubmit<PublicationCreateInput>,
    categories: Category[],
    onSubmit: (data: PublicationCreateInput) => void,
    category: string
}

const PublicationCreateView: FunctionComponent<PublicationCreateViewProps> = (
    {
        isAddingPublication,
        onAddingChange,
        handlePost,
        loading,
        onLoadingChange,
        register,
        handleSubmit,
        categories,
        onSubmit,
        category
    }
) => {
    return (
        <PublicationCreate 
        isAddingPublication={isAddingPublication}
        onAddingChange={onAddingChange}
        handlePost={handlePost}
        loading={loading}
        onLoadingChange={onLoadingChange}
        register={register}
        handleSubmit={handleSubmit}
        categories={categories}
        onSubmit={onSubmit}
        category={category}
        />
    )
}

export default PublicationCreateView
