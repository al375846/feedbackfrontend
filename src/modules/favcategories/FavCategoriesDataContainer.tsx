import React, { useContext, useEffect, useState } from 'react'
import CredentialsContext from '../../contexts/CredentialsContext'
import { CategoryRaw, SubCategory } from '../../entities/Category'
import { ProfileRepository } from '../profiles/repository/ProfileRepository'
import FavCategoriesView from './FavCategoriesView'

const FavCategoriesDataContainer = () => {

    const [categories, setCategories] = useState<CategoryRaw[]>()
    const [favcategories, setFavcategories] = useState<SubCategory[]>()

    const credentials = useContext(CredentialsContext)
    const repository = new ProfileRepository()

    useEffect(() => {
        if (!categories)
            repository.getCategoriesRaw(credentials.token)
                .then(res => setCategories(res.data.categories))

        if (!favcategories)
            repository.getCategoriesExpert(credentials.token)
                .then(res => setFavcategories(res.data.favCategories))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, categories, favcategories])

    const postFavCategory = (id: number) => {
        repository.postCategoryFavourite(id, credentials.token)
            .then(res => {
                setFavcategories([...favcategories || [], res.data.favCategory])
                const icon = document.getElementById(`star${id}`) as HTMLElement
                icon.className = 'star icon'
            })
            .catch(err => window.alert(err))
    }

    const deleteFavCategory = (id: number, category: SubCategory) => {
        repository.deleteCategoryFavourite(id, credentials.token)
            .then(() => {
                const i = favcategories?.indexOf(category)
                const newfavs = [...favcategories || []]
                if (i)
                    newfavs.splice(i, 1)
                setFavcategories(newfavs)
                const icon = document.getElementById(`star${id}`) as HTMLElement
                icon.className = 'star outline icon'
            })
            .catch(err => window.alert(err))
    }

    const handleFav = (id: number) => {
        const category = favcategories?.find(cat => cat.id === id)
        if (!category)
            postFavCategory(id)
        else
            deleteFavCategory(id, category)
    }

    const favIds = favcategories?.map((fav) => {
        return fav.id
    })

    return (
        <FavCategoriesView 
            handleFav={handleFav}
            categories={categories}
            favIds={favIds}/>
    )
}

export default FavCategoriesDataContainer