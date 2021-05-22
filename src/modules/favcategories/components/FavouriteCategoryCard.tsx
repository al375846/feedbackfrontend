import React, { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'

import { CategoryRaw } from '../../../entities/Category'

interface FavouriteCategoryCardProps {
    category: CategoryRaw,
    favIds: number[]
    handleFav: (id: number) => void
};

const FavouriteCategoryCard: FunctionComponent<FavouriteCategoryCardProps> = (
    {
        category,
        favIds,
        handleFav
    }
) => {

    const renderFavIcon = (id: number) => {
        if (favIds.indexOf(id) === -1)
            return <i id={`star${id}`} 
                onClick={() => handleFav(id)} className="star outline icon"></i>
        else
            return <i id={`star${id}`} 
                onClick={() => handleFav(id)} className="star icon"></i>
    }

    return(
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
    )
}

export default FavouriteCategoryCard