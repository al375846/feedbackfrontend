import React, { FunctionComponent } from 'react'
import { CategoryRaw } from '../../entities/Category'
import FavCategoriesInfo from './components/FavCategoriesInfo'

interface FavCategoriesViewProps {
    handleFav: (id: number) => void,
    categories: CategoryRaw[] | undefined,
    favIds: number[] | undefined
}

const FavCategoriesView: FunctionComponent<FavCategoriesViewProps> = (
    {
        handleFav,
        categories,
        favIds
    }
) => {
    return (
        <FavCategoriesInfo 
            handleFav={handleFav}
            categories={categories}
            favIds={favIds}/>
    )
}

export default FavCategoriesView
