import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { SubCategory, CategoryRaw } from '../../../entities/Category'
import '../ProfileTotal.css'
import { ProfileRepository } from '../repository/ProfileRepository'

const FavCategoriesInfo = () => {

    const credentials = useContext(CredentialsContext);
    const [ categories, setCategories ] = useState<CategoryRaw[]>();
    const [ favcategories, setFavcategories ] = useState<SubCategory[]>();
    const repository = new ProfileRepository();

    useEffect(() => {
        const searchCategories = () => {
            repository.getCategoriesRaw(credentials.token)
            .then(res => setCategories(res.data.categories))    
        }

        const searchCategoriesExpert = () => {
            repository.getCategoriesExpert(credentials.token)
            .then(res => setFavcategories(res.data.favCategories))
        }

        if (credentials.token && !categories)
            searchCategories()

        if (credentials.token && !favcategories)
            searchCategoriesExpert()

    }, [credentials.token, categories, favcategories])

    if (!categories || !favcategories)
        return <div><Spinner animation="border" /></div> 

    const postFavCategory = (id: number) => {
        repository.postCategoryFavourite(id, credentials.token)
        .then(res => {
            setFavcategories([...favcategories, res.data.favCategory])
            const icon = document.getElementById(`star${id}`) as HTMLElement
            icon.className = 'star icon'
        })
        .catch(err => window.alert(err))
    }

    const deleteFavCategory = (id:number, category: SubCategory) => {
        repository.deleteCategoryFavourite(id, credentials.token)
        .then(() => {
            const i = favcategories.indexOf(category)
            const newfavs = [...favcategories]
            newfavs.splice(i, 1)
            setFavcategories(newfavs)
            const icon = document.getElementById(`star${id}`) as HTMLElement
            icon.className = 'star outline icon'
        })
        .catch(err => window.alert(err))  
    }

    const handleFav = (id: number) => {
        const category = favcategories.find(cat => cat.id === id)
        if (!category)
            postFavCategory(id)
        else
            deleteFavCategory(id, category)
    }

    const renderFavIcon = (id: number) => {
        const favIds = favcategories.map((fav) => {
            return fav.id
        })
        if (favIds.indexOf(id) === -1)
            return <i id={`star${id}`} onClick={() => handleFav(id)} className="star outline icon"></i>
        else
            return <i id={`star${id}`} onClick={() => handleFav(id)} className="star icon"></i>
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