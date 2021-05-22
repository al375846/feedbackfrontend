import React, { useContext, useEffect, useState } from 'react'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { Category } from '../../../entities/Category';
import { Suggestion } from '../../../entities/Suggestion';
import { ProfileRepository } from '../repository/ProfileRepository';
import AdminProfileView from './AdminProfileView';

const AdminProfileDataContainer = () => {

    const [ categoryparent, setCategoryParent ] = useState<string>('')
    const [ suggestions, setSuggestions ] = useState<Suggestion[]>()

    const credentials = useContext(CredentialsContext)
    const categoryadmin = useContext(CategoryAdminContext)
    const repository = new ProfileRepository()

    useEffect(() => {
        if (!categoryadmin.categories)
            repository.getCategories()
            .then(res => {
                categoryadmin.onCategoriesChange(res.data.categories)
                setCategoryParent(res.data.categories[0].name)
            })
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, categoryadmin.categories])

    useEffect(() => {
        if (!suggestions)
            repository.getSuggestions()
            .then(res => setSuggestions(res.data.suggestions))
            .catch(err => window.alert(err))
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, suggestions])

    const handleAccept = (suggestion: Suggestion) => {
        const parent = suggestion.parent ? {name: suggestion.parent.name} : null
        const categoryData = {
            name: suggestion.name,
            description: suggestion.description,
            parent: parent
        }

        repository.postCategory(categoryData)
        .then(res => {
            if (!parent) {
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
                    ?.find(cat => cat.name === parent.name)?.subcategories
                    ?.push(res.data.category)
        })
        .catch(err => window.alert(err))
        .finally(() => handleRemove(suggestion))
    }

    const handleRemove = (suggestion: Suggestion) => {
        repository.deleteSuggestion(suggestion.id.toString())
        .then(() => {
            const newsuggestions = [...suggestions || []]
            const pos = newsuggestions.indexOf(suggestion)
            newsuggestions.splice(pos, 1)
            setSuggestions([...newsuggestions])
        })  
    }

    const handleCategory = (cat: Category) => setCategoryParent(cat.name)

    return (
        <AdminProfileView 
            categoryparent={categoryparent}
            suggestions={suggestions}
            categories={categoryadmin.categories}
            handleCategory={handleCategory}
            handleAccept={handleAccept}
            handleRemove={handleRemove}/>
    )
}

export default AdminProfileDataContainer