import React, { FunctionComponent, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'

import '../ProfileTotal.css'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { useForm } from 'react-hook-form'
import InputForm from '../../../components/form/input/InputForm'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import CategoryAdminContext from '../../../contexts/CategoryAdminContext'
import { ProfileRepository } from '../repository/ProfileRepository'
import { Category } from '../../../entities/Category'

export interface CategoryCreateProps {
    visible: boolean,
    onShowChange: (show: boolean) => void,
    parent: string,
    add: string
}

type CategoryCreateInput = {
    name: string,
    description: string
}

const CategoryCreate: FunctionComponent<CategoryCreateProps> = (
    {
        visible,
        onShowChange,
        parent,
        add
    }
) => {

    const credentials = useContext(CredentialsContext);
    const { register, handleSubmit, reset } = useForm<CategoryCreateInput>();
    const categoryadmin = useContext(CategoryAdminContext);
    const repository = new ProfileRepository();

    const handleCreate = () => {
        onShowChange(false)
        reset({ name: '', description: '' })
    }

    const onSubmit = (data: CategoryCreateInput) => {

        const categoryData = {
            name: data.name,
            description: data.description,
            parent: add === 'category' ? null : {name: parent}
        }

        repository.postCategory(categoryData, credentials.token)
        .then(res => {
            if (add === 'category') {
                const category: Category = {
                    id: res.data.category.id,
                    name: res.data.category.name, 
                    description: res.data.category.description,
                    children: []
                }
                const newCategories = [...categoryadmin.categories || [], category]
                categoryadmin.onCategoriesChange(newCategories)
            }
            else
                categoryadmin.categories
                    ?.find(cat => cat.name === parent)?.children
                    ?.push(res.data.category)
        })
        .catch(err => window.alert(err))
        .finally(() => handleCreate())
    }

    if (!visible)
        return null
    
    return (
        <div className="category-form">
            <div className="create-form">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm 
                        name={"category-name"}
                        label={"Name"}
                        value={""}
                        type={"text"}
                        required={true}
                        input={'name'}
                        register={register}/>

                    <InputTextArea 
                        name={"category-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        input={'description'}
                        register={register}/>

                    <Button variant="primary" type="submit" className="submit-category">
                        Submit
                    </Button>
                    <Button variant="primary" type="button" 
                        onClick={() => onShowChange(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CategoryCreate