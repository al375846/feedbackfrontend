import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Suggestion } from '../../../entities/Suggestion'
import api from '../../../api/Api'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'
import { CategoryRaw } from '../../../entities/Category'

const SuggestionList = () => {

    const credentials = useContext(CredentialsContext)
    const categoryadmin = useContext(CategoryAdminContext)
    const [suggestions, setSuggestions] = useState<Suggestion[]>()

    useEffect(() => {

        const searchSuggestions = async() => {
            const {data} = await api.get('/api/suggestion', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setSuggestions(data.suggestions)
        }

        if (credentials.token && !suggestions)
            searchSuggestions()

    }, [credentials.token, suggestions])

    if (!suggestions)
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div> 
        )

    const handleAccept = async(suggestion: Suggestion) => {
        const parent = suggestion.parent ? {name: suggestion.parent.name} : null
        const catdata = {
            name: suggestion.name,
            description: suggestion.description,
            parent: parent
        }

        const {data} = await api.post('/api/category', catdata, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        const newcat: CategoryRaw = data.category
        if (!parent) {
            const newcategories = [...categoryadmin.categories!]
            newcategories.push({
                id: newcat.id, description: newcat.description, name: newcat.name, children: []
            })
            categoryadmin.onCategoriesChange(newcategories)
        }
        else {
            const cat = categoryadmin.categories!.find(category =>
                category.name === parent.name
            )
            cat?.children.push({
                id: newcat.id, description: newcat.description, name: newcat.name,
            })
        }


        await handleRemove(suggestion)
    }

    const handleRemove = async(suggestion: Suggestion) => {
        api.delete(`/api/suggestion/${suggestion.id}`)
        const newsuggestions = [...suggestions]
        const pos = newsuggestions.indexOf(suggestion)
        newsuggestions.splice(pos, 1)
        setSuggestions([...newsuggestions])
    }

    const rendersuggestions = suggestions.map((suggestion) => {
        return (
            <Card key={suggestion.id}>
                <Card.Header>
                <div className="suggestion-left">
                    {suggestion.name}
                </div>
                <div className="suggestion-right">
                    {suggestion.parent ? suggestion.parent.name : 'Categoría principal'}
                </div>
                </Card.Header>
                <Card.Body>
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text">{suggestion.description}</div>
                        </div>
                    </div>
                </div>
                </Card.Body>
                <Card.Footer>
                    <div className="suggestion-left">
                        <Button onClick={() => handleAccept(suggestion)}>
                            Accept
                        </Button>
                    </div>
                    <div className="suggestion-right">
                        <Button onClick={() => handleRemove(suggestion)}>
                            Decline
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        )
    })

    return (
        <div className="suggestion-list">
            {rendersuggestions}
        </div>
    )
}

export default SuggestionList