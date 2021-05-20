import React, { FunctionComponent } from 'react'
import { Category } from '../../../entities/Category'
import { Suggestion } from '../../../entities/Suggestion'
import AdminProfile from './components/AdminProfile'

interface AdminProfileViewProps {
    categoryparent: string,
    suggestions: Suggestion[] | undefined,
    categories: Category[] | undefined,
    handleCategory: (cat: Category) => void,
    handleAccept: (suggestion: Suggestion) => void,
    handleRemove: (suggestion: Suggestion) => void
}

const AdminProfileView: FunctionComponent<AdminProfileViewProps> = (
    {
        categoryparent,
        suggestions,
        categories,
        handleCategory,
        handleAccept,
        handleRemove
    }
) => {
    return (
        <AdminProfile 
            categoryparent={categoryparent}
            suggestions={suggestions}
            categories={categories}
            handleCategory={handleCategory}
            handleAccept={handleAccept}
            handleRemove={handleRemove}/>
    )
}

export default AdminProfileView
