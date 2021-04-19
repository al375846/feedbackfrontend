import React, { useState, useEffect, useContext, FormEvent } from 'react'
import { Button, Col, Form, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Category } from '../../entities/Category'
import api from '../../api/Api'
import './PublicationCreate.css'

export interface PublicationCreateProps {
    visible: boolean
}

const PublicationCreate = (props: PublicationCreateProps) => {

    const [categories, setCategories] = useState<Category[]>()
    const [selectedCategory, setSelectedCategory] =  useState<number>(0)
    const credentials = useContext(CredentialsContext)

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

    if (!props.visible)
        return (
            <div style={{display: 'none'}}>
            </div>
        )

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

    let renderSubcateogries
    if (categories[selectedCategory].children) {
        renderSubcateogries = categories[selectedCategory].children.map((subcategory, index) => {
            return (
                <option value={subcategory.name} key={subcategory.name+index}>{subcategory.name}</option>
            )
        })
    }
    else
        renderSubcateogries = <option value={-1}>No hay subcategorias</option>

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(e.target)
        let input = document.getElementById('title') as HTMLInputElement
        console.log(input.value)
    }

    return (
        <div className="publication-form">
            <div className="create-form">
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" onChange={(e) => {setSelectedCategory(parseInt(e.target.value))}}>
                            {renderCategories}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="subcategory">
                        <Form.Label>Subcategory</Form.Label>
                        <Form.Control as="select">
                            {renderSubcateogries}
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="Tags" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control as="textarea" rows={4}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PublicationCreate