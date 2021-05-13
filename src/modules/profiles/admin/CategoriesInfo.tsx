import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Category } from '../../../entities/Category'
import { Button, Spinner } from 'react-bootstrap'
import '../ProfileTotal.css'
import CategoryCreate from './CategoryCreate'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'
import { ProfileRepository } from '../repository/ProfileRepository'
import CategoryInfoCard from '../../../components/cards/CategoryInfoCard'

interface CategoriesInfoProps {

}

const CategoriesInfo: FunctionComponent<CategoriesInfoProps> = () => {

    const categoryadmin = useContext(CategoryAdminContext);
    const [ categoryparent, setCategoryParent ] = useState<string>('');
    const [ add, setAdd ] = useState<string>('category');
    const [ showCreate, setShowCreate ] = useState<boolean>(false);
    const credentials = useContext(CredentialsContext);
    const repository = new ProfileRepository();
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {

        const searchCategories = () => {
            setLoading(true)
            repository.getCategories(credentials.token)
            .then(res => {
                categoryadmin.onCategoriesChange(res.data.categories)
                setCategoryParent(res.data.categories[0].name)
            })
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !categoryadmin.categories)
            searchCategories()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, categoryadmin.categories])

    const handleCategory = (cat: Category) => setCategoryParent(cat.name)

    const handleCreate = (type: string) => {
        type === 'category' 
            ? setAdd('category') 
            : setAdd('subcategory')
        setShowCreate(true)
    }

    const onShowChange = (show: boolean) => setShowCreate(show)

    if (loading || !categoryadmin.categories)
        return <div className="loading"><Spinner animation="border" /></div> 

    const renderedSubcategories = categoryadmin.categories
    .find(cat => cat.name === categoryparent)?.subcategories
    ?.map((category) => {
        return <CategoryInfoCard
                key={category.id} 
                category={null}
                subCategory={category}
                handleCategory={() => {}}/>
    })

    const renderCategories = categoryadmin.categories
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
                <Button className="add-category" 
                    onClick={() => handleCreate('category')}>
                    Add category
                </Button>
                <div className="categories-names">
                    {renderCategories}
                </div>
                
            </div>
            <div className="parent-subcategories">
                <Button className="add-category" 
                    onClick={() => handleCreate('subcategory')}>
                    Add Subcategory
                </Button>
                <div className="subcategories-names">
                    {renderedSubcategories}
                </div>
            </div>
            <CategoryCreate 
                parent={categoryparent} 
                visible={showCreate} 
                onShowChange={onShowChange} 
                add={add}
            />
        </div>
    )
}

export default CategoriesInfo