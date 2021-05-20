import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Category } from '../../../entities/Category'
import PublicationCreate from './components/PublicationCreate'
import { PublicationCreateInput } from './PublicationCreateDataContainer'

interface PublicationCreateViewProps {
    isAddingPublication: boolean,
    onAddingChange: (adding: boolean) => void,
    loading: boolean,
    register: UseFormRegister<PublicationCreateInput>,
    handleSubmit: UseFormHandleSubmit<PublicationCreateInput>,
    categories: Category[],
    onSubmit: (data: PublicationCreateInput) => void,
    category: string,
    usertype: string
}

const PublicationCreateView: FunctionComponent<PublicationCreateViewProps> = (
    {
        isAddingPublication,
        onAddingChange,
        loading,
        register,
        handleSubmit,
        categories,
        onSubmit,
        category,
        usertype
    }
) => {
    return (
        <PublicationCreate 
        isAddingPublication={isAddingPublication}
        onAddingChange={onAddingChange}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        categories={categories}
        onSubmit={onSubmit}
        category={category}
        usertype={usertype}
        />
    )
}

export default PublicationCreateView
