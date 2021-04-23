import React, { useContext, useEffect, useState } from 'react'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Category, SubCategory } from '../../../entities/Category'
import api from '../../../api/Api'
import { Button, Card, Spinner } from 'react-bootstrap'
import '../ProfileTotal.css'
import CategoryCreate from './CategoryCreate'

const CategoriesInfo = () => {

    const [categories, setCategories] = useState<Category[]>()
    const [subcategories, setSubCategories] = useState<SubCategory[]>([])
    const [categoryparent, setCategoryParent] = useState<string>('')
    const [add, setAdd] = useState<string>('category')
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const searchCategories = async () => {
            const {data} = await api.get('/api/category', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setCategories(data.categories)
            setSubCategories(data.categories[0].children)
            setCategoryParent(data.categories[0].name)
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
    
    const handleCategory = (cat: Category) => {
        setCategoryParent(cat.name)
        setSubCategories(cat.children? cat.children : [])
    }

    const renderCategories = categories.map((category) => {
        return (
            <div key={category.id} className="category-admin" onClick={() => handleCategory(category)}>
                <Card>
                <Card.Body>
                    {category.name}
                </Card.Body>
                </Card>
            </div>
        )
    })

    const renderSubcategories = subcategories.map((category) => {
        return (
            <div key={category.id} className="category-admin">
                <Card>
                <Card.Body>
                    {category.name}
                </Card.Body>
                </Card>
            </div>
        )
    })

    const handleCreateCategory = () => {
        setAdd('category')
        setShowCreate(true)
    }

    const handleCreateSubCategory = () => {
        setAdd('subcategory')
        setShowCreate(true)
    }

    const postCategory = (category: Category | null, subCategory: SubCategory | null) => {
        if (add === 'category') {
            categories.push(category!)
        }
        else {
            const cat = categories.find(category =>
                category.name === categoryparent
            )
            cat?.children.push(subCategory!)
        }
    }
    
    return (
        <div>
            <div className="parent-categories">
                <Button className="add-category" onClick={handleCreateCategory}>
                    Add category
                </Button>
                <div className="categories-names">
                    {renderCategories}
                </div>
                
            </div>
            <div className="parent-subcategories">
                <Button className="add-category" onClick={handleCreateSubCategory}>
                    Add Subcategory
                </Button>
                <div className="subcategories-names">
                    {renderSubcategories}
                </div>
            </div>
            <CategoryCreate parent={categoryparent} visible={showCreate} setShowCreate={setShowCreate} add={add} postCategory={postCategory}/>
        </div>
    )
}

export default CategoriesInfo