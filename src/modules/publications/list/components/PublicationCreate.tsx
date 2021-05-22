import React, { FunctionComponent } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { Category, CategoryCreateOptions } from '../../../../entities/Category'
import './PublicationTotal.css'
import InputForm from '../../../../components/form/input/InputForm';
import InputFile from '../../../../components/form/files/InputFile';
import InputSelect from '../../../../components/form/select/InputSelect';
import InputTextArea from '../../../../components/form/textarea/InputTextArea';
import { isApprentice } from '../../../../contexts/CredentialsContext';
import { PublicationCreateInput } from '../../../../entities/Publication';

export interface PublicationCreateProps {
    isAddingPublication: boolean,
    onAddingChange: (adding: boolean) => void,
    loading: boolean,
    register: UseFormRegister<PublicationCreateInput>,
    handleSubmit: UseFormHandleSubmit<PublicationCreateInput>,
    categories: Category[],
    onSubmit: (data: PublicationCreateInput) => void,
    category: string,
    usertype: string
}

const PublicationCreate: FunctionComponent<PublicationCreateProps> = (
    {
        isAddingPublication,
        onAddingChange,
        loading,
        register,
        handleSubmit,
        categories,
        onSubmit,
        category,
        usertype
    }
) => {

    const getSubCategories = () => {
        const defaultOption = <option value={CategoryCreateOptions.DEFAULT} key={"select -1"}>Seleccionar subcategoria</option>
        const subCategories = categories.find(cat => cat.name === category)?.subcategories?.map((subcategory, index) => {
            return <option value={subcategory.name} key={subcategory.name+index}>{subcategory.name}</option>
        })
        return [defaultOption, ...subCategories || []]
    }

    const renderCategories = categories.map((category, index) => {
        return <option value={category.name} key={category.name+index}>{category.name}</option>
    })

    if (!isApprentice(usertype)) return null

    if (!isAddingPublication) 
        return (
            <div className="publication-add">
                <Button className="add-button" onClick={() => onAddingChange(!isAddingPublication)}>
                    <i className="plus icon"></i>
                </Button> 
            </div>
        )

    if (categories.length === 0)
        return <div className="loading"><Spinner animation="border"/></div>
    
    return (
        <div className="publication-form">
            <div className="create-form">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm 
                        name={"publication-title"}
                        label={"Title"}
                        value={""}
                        type={"text"}
                        required={true}
                        input={'title'}
                        register={register}/>
                    <Row>
                        <Col>
                        <InputSelect 
                            name={"publication-category"}
                            label={"Category"}
                            options={renderCategories}
                            input={'category'}
                            register={register}/>
                        </Col>
                        <Col>
                        <InputSelect 
                            name={"publication-subcategory"}
                            label={"Subcategory"}
                            options={getSubCategories()}
                            input={'subcategory'}
                            register={register}/>
                        </Col>
                    </Row>

                    <InputForm 
                        name={"publication-tags"}
                        label={"Tags"}
                        value={""}
                        type={"text"}
                        required={false}
                        input={'tags'}
                        register={register}/>

                    <InputTextArea 
                        name={"publication-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        input={'description'}
                        register={register}/>

                    <InputFile
                        name={"files-publication"}
                        label={"Files"}
                        accept={"application/pdf,video/mp4,image/jpg,image/jpeg,image/png"}
                        register={register}
                        input={'files'}/>

                    <Alert variant="info" show={loading}>
                        Publicando...
                    </Alert>
                    <Button variant="primary" type="submit" className="submit-button">
                        Submit
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => onAddingChange(!isAddingPublication)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PublicationCreate