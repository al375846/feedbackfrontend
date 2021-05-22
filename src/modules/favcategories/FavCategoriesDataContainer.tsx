import React, { useEffect, useState } from 'react'
import { CategoryRaw, SubCategory } from '../../entities/Category'
import FavCategoriesView from './FavCategoriesView'
import { FavCategoriesRepository } from './repository/FavcategoriesRepository'

const FavCategoriesDataContainer = () => {

    const [categories, setCategories] = useState<CategoryRaw[]>()
    const [favcategories, setFavcategories] = useState<SubCategory[]>()

    const repository = new FavCategoriesRepository()

    useEffect(() => {
        if (!categories)
            repository.getCategoriesRaw()
                .then(res => setCategories(res.data.categories))

        if (!favcategories)
            repository.getCategoriesExpert()
                .then(res => setFavcategories(res.data.favCategories))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, favcategories])

    const postFavCategory = (id: number) => {
        repository.postCategoryFavourite(id.toString())
            .then(res => {
                setFavcategories([...favcategories || [], res.data.favCategory])
                const icon = document.getElementById(`star${id}`) as HTMLElement
                icon.className = 'star icon'
            })
            .catch(err => window.alert(err))
    }

    const deleteFavCategory = (id: number, category: SubCategory) => {
        repository.deleteCategoryFavourite(id.toString())
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