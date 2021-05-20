import React, { FunctionComponent } from 'react'

import { Category } from '../../../../entities/Category'
import { Spinner } from 'react-bootstrap'
import '../../user/ProfileTotal.css'
import CategoryInfoCard from '../../../../components/cards/CategoryInfoCard'

interface CategoriesInfoProps {
    categoryparent: string,
    categories: Category[] | undefined,
    handleCategory: (cat: Category) => void
}

const CategoriesInfo: FunctionComponent<CategoriesInfoProps> = (
    {
        categoryparent,
        categories,
        handleCategory
    }
) => {

    if (!categories)
        return <div className="loading"><Spinner animation="border" /></div>

    const renderSubCategories = () => {
        const subcategories = categories
        .find(cat => cat.name === categoryparent)?.subcategories

        if (subcategories?.length === 0) return 'No hay subcategorias'
        else
            return (
                subcategories?.map((category) => {
                    return <CategoryInfoCard
                            key={category.id} 
                            category={null}
                            subCategory={category}
                            handleCategory={() => {}}/>
                })
            )
    }

    const renderCategories = categories
    .map((category) => {
        return <CategoryInfoCard
                key={category.id} 
                category={category}
                subCategory={null}
                handleCategory={handleCategory}/>
    })
    
    return (
        <div>
            <div className="parent-categories">
                <div className="categories-names">
                    {renderCategories}
                </div>
                
            </div>
            <div className="parent-subcategories">
                <div className="subcategories-names">
                    {renderSubCategories()}
                </div>
            </div>
        </div>
    )
}

export default CategoriesInfo