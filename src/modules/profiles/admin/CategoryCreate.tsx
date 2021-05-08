import React, { useContext } from 'react'
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
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    parent: string,
    add: string
}

type CategoryCreateInput = {
    name: string,
    description: string
}

const CategoryCreate = (props: CategoryCreateProps) => {

    const credentials = useContext(CredentialsContext);
    const { register, handleSubmit, reset } = useForm<CategoryCreateInput>();
    const categoryadmin = useContext(CategoryAdminContext);
    const repository = new ProfileRepository();

    const handleCreate = () => {
        props.setShowCreate(false)
        reset({ name: '', description: '' })
    }

    const onSubmit = (data: CategoryCreateInput) => {

        const categoryData = {
            name: data.name,
            description: data.description,
            parent: props.add === 'category' ? null : {name: props.parent}
        }

        repository.postCategory(categoryData, credentials.token)
        .then(res => {
            if (props.add === 'category') {
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
                    ?.find(cat => cat.name === props.parent)?.children
                    ?.push(res.data.category)
        })
        .catch(err => window.alert(err))
        .finally(() => handleCreate())
    }

    if (!props.visible)
    return ( <div style={{display: 'none'}}> </div> )
    
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
                        register={register}
                    />
                    <InputTextArea 
                        name={"category-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        input={'description'}
                        register={register}
                    />

                    <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                        Submit
                    </Button>
                    <Button variant="primary" type="button" onClick={() => props.setShowCreate(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CategoryCreate