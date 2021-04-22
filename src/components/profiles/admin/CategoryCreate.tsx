import React, { FormEvent, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import './CategoryCreate.css'
import api from '../../../api/Api'
import CredentialsContext from '../../../contexts/CredentialsContext'

export interface CategoryCreateProps {
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    parent: string
    add: string
}

const CategoryCreate = (props: CategoryCreateProps) => {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    if (!props.visible)
        return (
            <div style={{display: 'none'}}>
            </div>
        )

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const catdata = {
            name: name,
            description: description,
            parent: props.add === 'category' ? null : {name: props.parent}
        }

        const postCategory = async() => { 
            const {data} = await api.post('/api/category', catdata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
        }

        postCategory().then(() => {
            props.setShowCreate(false)
            setName('')
            setDescription('')
        })
    }
    
    return (
        <div className="category-form">
            <div className="create-form">
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="category-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                        Submit
                    </Button>
                    <Button variant="primary" type="button" onClick={() => props.setShowCreate(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CategoryCreate