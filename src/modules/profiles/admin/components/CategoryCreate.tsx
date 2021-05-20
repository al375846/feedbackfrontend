import React, { FunctionComponent } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

import '../../user/ProfileTotal.css'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import InputForm from '../../../../components/form/input/InputForm'
import InputTextArea from '../../../../components/form/textarea/InputTextArea'
import { Category } from '../../../../entities/Category'
import { CategoryCreateInput, CategoryCreateOptions } from '../CreateCategoryDataContainer'
import InputSelect from '../../../../components/form/select/InputSelect'

interface CategoryCreateProps {
    isAddingCategory: boolean,
    onShowChange: (show: boolean) => void,
    register: UseFormRegister<CategoryCreateInput>, 
    handleSubmit: UseFormHandleSubmit<CategoryCreateInput>,
    onSubmit: (data: CategoryCreateInput) => void,
    categories: Category[] | undefined
}

const CategoryCreate: FunctionComponent<CategoryCreateProps> = (
    {
        isAddingCategory,
        onShowChange,
        register, 
        handleSubmit,
        onSubmit,
        categories
    }
) => {

    if (!isAddingCategory)
        return (
            <div className="category-add">
                <Button className="add-button" onClick={() => onShowChange(!isAddingCategory)}>
                    <i className="plus icon"></i>
                </Button> 
            </div>
        )

    if (!categories)
        return <div className="loading"><Spinner animation="border"/></div>

    const getCategories = () => {
        const defaultOption = <option value={CategoryCreateOptions.DEFAULT} key={"select -1"}>Seleccionar categoria</option>
        const renderCategories = categories.map((category, index) => {
            return <option value={category.name} key={category.name+index}>{category.name}</option>
        })
        return [defaultOption, ...renderCategories || []]
    }
    
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

                    <InputSelect 
                        name={"category-parent"}
                        label={"Parent"}
                        options={getCategories()}
                        input={'parent'}
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
                    <Button variant="secondary" type="button" 
                        onClick={() => onShowChange(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CategoryCreate