import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

import { CategoryRaw, SubCategory } from '../../entities/Category';

interface FavouriteCategoryCardProps {
    category: CategoryRaw,
    favcategories: SubCategory[]
    handleFav: (id: number) => void
};

const FavouriteCategoryCard: FunctionComponent<FavouriteCategoryCardProps> = (
    {
        category,
        favcategories,
        handleFav
    }
) => {

    const renderFavIcon = (id: number) => {
        const favIds = favcategories.map((fav) => {
            return fav.id
        })
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