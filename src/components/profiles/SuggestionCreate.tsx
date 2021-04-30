import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Category } from '../../entities/Category'
import api from '../../api/Api'

const SuggestionCreate = () => {

    const credentials = useContext(CredentialsContext)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>()
    const [category, setCategory] = useState<number>(-1)
    const [type, setType] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const [variant, setVariant] = useState<string>('')
    const [message, setMessage] = useState<string>('')

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

    const popupAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const parent = category === -1 || type !== 'category' ? null : {name: categories[category].name}

        const sugdata = {
            name: name,
            type: type,
            description: description,
            parent: parent,
            date: new Date()
        }
        console.log(sugdata)

        await api.post('/api/suggestion', sugdata, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        }).then(() => {
            setName('')
            setDescription('')
            setVariant('success')
            setMessage('Sugerencia enviada')
        }).catch(() => {
            setVariant('danger')
            setMessage('El nombre de la sugerencia ya existe')
        })

        popupAlert()
        
    }

    const renderparent = () => {
        if (type === 'category')
            return  (
            <Form.Group controlId="suggestion-category">
            <Form.Label>Parent</Form.Label>
            <Form.Control as="select" value={category} onChange={(e) => {setCategory(parseInt(e.target.value))}}>
                <option value={-1} key={-1}>Selecciona categoria padre</option>
                {renderCategories}
            </Form.Control>
            </Form.Group>
            )
    }

    return(
        <div className="suggestion-create">
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label>¿Alguna sugerencia?</Form.Label>
            <Form.Group controlId="suggestion-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} required={true}/>
            </Form.Group>
            <Form.Group>
            <Form.Label>Tipo de sugerencia</Form.Label>
            <Form.Check type='radio' id="category" label="Category" name="types" value="category" onChange={e => setType(e.target.value)} required={true}/>
            <Form.Check type='radio' id="upgrade" label="Upgrade" name="types" value="upgrade" onChange={e => setType(e.target.value)}/>
            </Form.Group>
            {renderparent()}
            <Form.Group controlId="suggestion-description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)} required={true}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                Submit
            </Button>
        </Form>
        <Alert variant={variant} show={alert} onClose={() => setAlert(false)} dismissible={true}>
            {message}
        </Alert>
        </div>
        
    )
}

export default SuggestionCreate