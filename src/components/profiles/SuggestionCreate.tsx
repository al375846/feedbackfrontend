import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Category } from '../../entities/Category'
import api from '../../api/Api'

const SuggestionCreate = () => {

    const credentials = useContext(CredentialsContext)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>()
    const [category, setCategory] = useState<number>(-1)

    useEffect(() => {
        const searchCategories = async () => {
            const {data} = await api.get('/api/category', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setCategories(data.categories)
        }

        if (credentials.token && !categories)
            searchCategories()

    }, [categories, credentials.token])

    if (!categories)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const renderCategories = categories.map((category, index) => {
        return (
            <option value={index} key={category.name+index}>{category.name}</option>
        )
    })

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const parent = category === -1 ? null : {name: categories[category].name}
        const sugdata = {
            name: name,
            description: description,
            parent: parent
        }

        const postNewSuggestion = async() => { 
            await api.post('/api/suggestion', sugdata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
        }

        postNewSuggestion().then(() => {
            setName('')
            setDescription('')
        })
    }

    return(
        <div className="suggestion-create">
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label>¿Alguna sugerencia para nueva cateogria?</Form.Label>
            <Form.Group controlId="suggestion-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="suggestion-category">
            <Form.Label>Parent</Form.Label>
            <Form.Control as="select" value={category} onChange={(e) => {setCategory(parseInt(e.target.value))}}>
                <option value={-1} key={-1}>Selecciona categoria padre</option>
                {renderCategories}
            </Form.Control>
            </Form.Group>
            <Form.Group controlId="suggestion-description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                Submit
            </Button>
        </Form>
        </div>
        
    )
}

export default SuggestionCreate