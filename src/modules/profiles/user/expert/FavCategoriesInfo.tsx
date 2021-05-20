import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import FavouriteCategoryCard from '../../../../components/cards/FavouriteCategoryCard';
import CredentialsContext from '../../../../contexts/CredentialsContext';
import { CategoryRaw, SubCategory } from '../../../../entities/Category';
import { ProfileRepository } from '../../repository/ProfileRepository';


import '../ProfileTotal.css'


interface FavCategoriesInfoProps {

}

const FavCategoriesInfo: FunctionComponent<FavCategoriesInfoProps> = () => {

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, categories, favcategories])

    if (!categories || !favcategories)
        return <div><Spinner animation="border"/></div> 

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

    const renderCategories = categories.map((category) => {
        return <FavouriteCategoryCard
                    key={category.id}
                    category={category}
                    favcategories={favcategories}
                    handleFav={handleFav}/>
    })

    return (
        <div className="favourites-list">
            {renderCategories}
        </div>
    )
}

export default FavCategoriesInfo