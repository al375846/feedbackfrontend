import React, { FunctionComponent } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'

import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import InputForm from '../../../components/form/input/InputForm'
import InputRadio from '../../../components/form/radio/InputRadio'
import InputSelect from '../../../components/form/select/InputSelect'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import { Category, CategoryCreateOptions } from '../../../entities/Category'
import { SuggestionCreateInput, SuggestionTypes } from '../../../entities/Suggestion'

interface SuggestionCreateProps {
    categories: Category[] | undefined,
    alert: boolean,
    handleAlert: (alert: boolean) => void,
    variant: string,
    message: string,
    register: UseFormRegister<SuggestionCreateInput>,
    handleSubmit: UseFormHandleSubmit<SuggestionCreateInput>,
    onSubmit: (data: SuggestionCreateInput) => void,
    type: string
}

const SuggestionCreate: FunctionComponent<SuggestionCreateProps> = (
    {
        categories,
        alert,
        handleAlert,
        variant,
        message,
        register,
        handleSubmit,
        onSubmit,
        type
    }
) => {

    const radioValues = [
        {
            id: "category",
            label: "Category",
            value: SuggestionTypes.CATEGORY
        },
        {
            id: "upgrade",
            label: "Upgrade",
            value: SuggestionTypes.UPGRADE
        }
    ]


    const getCategories = () => {
        const defaultOption = <option value={CategoryCreateOptions.DEFAULT} key={"select -1"}>Seleccionar categoria</option>
        const renderCategories = categories?.map((category, index) => {
            return <option value={category.name} key={category.name+index}>{category.name}</option>
        })
        return [defaultOption, ...renderCategories || []]
    }

    const renderparent = () => {
        return type === SuggestionTypes.CATEGORY
        ? <InputSelect 
                name={"suggestion-category"}
                label={"Category"}
                options={getCategories()}
                input={'category'}
                register={register}
            /> 
        : null
    }

    if (!categories) return <div><Spinner animation="border" /></div>

    return(
        <div className="suggestion-create">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputForm 
                    name={"suggestion-name"}
                    label={"Name"}
                    value={""}
                    type={"text"}
                    required={true}
                    input={'name'}
                    register={register}/>
                    
                <InputRadio 
                    options={radioValues}
                    input={'type'}
                    register={register}/>

                {renderparent()}

                <InputTextArea 
                    name={"suggestion-description"}
                    label={"Description"}
                    row={4}
                    value={""}
                    input={'description'}
                    register={register}/>
                    
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Alert variant={variant} show={alert} 
                onClose={() => handleAlert(false)} dismissible={true}>
                {message}
            </Alert>
        </div>
    )
}

export default SuggestionCreate