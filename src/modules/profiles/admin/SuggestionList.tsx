import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Suggestion } from '../../../entities/Suggestion'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'
import { Category } from '../../../entities/Category'
import { ProfileRepository } from '../repository/ProfileRepository'
import SuggestionCard from '../../../components/cards/SuggestionCard'

const SuggestionList = () => {

    const credentials = useContext(CredentialsContext);
    const categoryadmin = useContext(CategoryAdminContext);
    const [ suggestions, setSuggestions ] = useState<Suggestion[]>();
    const repository = new ProfileRepository();
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {

        const searchSuggestions = async() => {
            setLoading(true)
            repository.getSuggestions(credentials.token)
            .then(res => setSuggestions(res.data.suggestions))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !suggestions)
            searchSuggestions()
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, suggestions])

    if ( loading || !suggestions )
        return <div className="loading"><Spinner animation="border" /></div> 

    const handleAccept = (suggestion: Suggestion) => {
        const parent = suggestion.parent ? {name: suggestion.parent.name} : null
        const categoryData = {
            name: suggestion.name,
            description: suggestion.description,
            parent: parent
        }

        repository.postCategory(categoryData, credentials.token)
        .then(res => {
            if (!parent) {
                const category: Category = {
                    id: res.data.category.id,
                    name: res.data.category.name, 
                    description: res.data.category.description,
                    children: []
                }
                const newCategories = [...categoryadmin.categories || [], category]
                categoryadmin.onCategoriesChange(newCategories)
            }
            else
                categoryadmin.categories
                    ?.find(cat => cat.name === parent.name)?.children
                    ?.push(res.data.category)
        })
        .catch(err => window.alert(err))
        .finally(() => handleRemove(suggestion))
    }

    const handleRemove = (suggestion: Suggestion) => {
        repository.deleteSuggestion(suggestion.id, credentials.token)
        .then(() => {
            const newsuggestions = [...suggestions]
            const pos = newsuggestions.indexOf(suggestion)
            newsuggestions.splice(pos, 1)
            setSuggestions([...newsuggestions])
        })  
    }

    const rendersuggestions = suggestions.map((suggestion) => {
        return <SuggestionCard 
                    key={suggestion.id}
                    suggestion={suggestion}
                    handleAccept={handleAccept} 
                    handleRemove={handleRemove}/>
    })

    return (
        <div className="suggestion-list">
            {rendersuggestions}
        </div>
    )
}

export default SuggestionList