import React, { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import { Category, SubCategory } from '../../../../entities/Category'

interface CategoryInfoCardProps {
    category: Category | null,
    subCategory: SubCategory | null,
    handleCategory: (cat: Category) => void
}

//category info card for admin profile
const CategoryInfoCard: FunctionComponent<CategoryInfoCardProps> = (
    {
        category,
        subCategory,
        handleCategory
    }
) => {
    //check if the category is a parent category or not
    if (category)
        return (
            <div className="category-admin" onClick={() => handleCategory(category)}>
                <Card>
                    <Card.Body>
                        {category.name}
                    </Card.Body>
                </Card>
            </div>
        )
    else
        return (
            <div className="category-admin">
                <Card>
                    <Card.Body>
                        {subCategory!.name}
                    </Card.Body>
                </Card>
            </div>
        )
}

export default CategoryInfoCard