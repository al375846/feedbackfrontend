import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { SubCategory, CategoryRaw } from '../../../entities/Category'
import api from '../../../api/Api'
import './FavCategoriesInfo.css'

const FavCategoriesInfo = () => {

    const credentials = useContext(CredentialsContext)
    const [categories, setCategories] = useState<CategoryRaw[]>()
    const [favcategories, setFavcategories] = useState<SubCategory[]>()

    useEffect(() => {
        const searchCategories = async () => {
            const {data} = await api.get('/api/category/raw', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setCategories(data.categories)
            
        }

        const searchCategoriesExpert = async () => {
            const {data} = await api.get('/api/expert/category', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setFavcategories(data.favCategories)
        }

        if (credentials.token && !categories)
            searchCategories()

        if (credentials.token && !favcategories)
            searchCategoriesExpert()

    }, [credentials.token, categories, favcategories])

    if (!categories || !favcategories)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const postFavCategory = async(id: number) => {
        api.post(`/api/expert/category/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })
        const icon = document.getElementById(`star${id}`) as HTMLElement
        icon.className = 'star icon'
    }

    const deleteFavCategory = async(id:number) => {
        api.delete(`/api/expert/category/${id}`, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })
        const icon = document.getElementById(`star${id}`) as HTMLElement
        icon.className = 'star outline icon'
    }

    const renderFavIcon = (id: number) => {
        const favIds = favcategories.map((fav) => {
            return fav.id
        })
        if (favIds.indexOf(id) === -1)
            return <i id={`star${id}`} onClick={() => postFavCategory(id)} className="star outline icon"></i>
        else
            return <i id={`star${id}`} onClick={() => deleteFavCategory(id)} className="star icon"></i>
    }

    const renderCategories = categories.map((category) => {
        return (
            <div key={category.id}>
                <Card>
                <Card.Body>
                <div className="category-fav">
                    {category.name}
                </div>
                <div className="icon-fav">
                    {renderFavIcon(category.id)}
                </div>
                </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div className="favourites-list">
            {renderCategories}
        </div>
    )
}

export default FavCategoriesInfo