import React, { useContext, useEffect, useState } from 'react'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Category, SubCategory } from '../../../entities/Category'
import api from '../../../api/Api'
import { Button, Card, Spinner } from 'react-bootstrap'
import '../ProfileTotal.css'
import CategoryCreate from './CategoryCreate'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'

const CategoriesInfo = () => {

    const categoryadmin = useContext(CategoryAdminContext)
    const [subcategories, setSubCategories] = useState<SubCategory[]>([])
    const [categoryparent, setCategoryParent] = useState<string>('')
    const [add, setAdd] = useState<string>('category')
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const credentials = useContext(CredentialsContext)

    const searchCategories = async () => {
        const {data} = await api.get('/api/category', {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })
        categoryadmin.onCategoriesChange(data.categories)
        setSubCategories(data.categories[0].children)
        setCategoryParent(data.categories[0].name)
    }

    useEffect(() => {

        if (credentials.token && !categoryadmin.categories)
            searchCategories()

    }, [credentials.token, categoryadmin])

    if (!categoryadmin.categories)
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div> 
        )
    
    const handleCategory = (cat: Category) => {
        setCategoryParent(cat.name)
        setSubCategories(cat.children? cat.children : [])
    }

    const renderCategories = categoryadmin.categories.map((category) => {
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

    const postCategory = () => {
        searchCategories()
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