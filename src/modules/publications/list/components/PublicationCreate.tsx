import React, { FunctionComponent } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { Category } from '../../../../entities/Category'
import './PublicationTotal.css'
import { PublicationPostParams, PublicationRepository } from '../../repository/PublicationRepository'
import { Publication } from '../../../../entities/Publication'
import InputForm from '../../../../components/form/input/InputForm';
import InputFile from '../../../../components/form/files/InputFile';
import InputSelect from '../../../../components/form/select/InputSelect';
import InputTextArea from '../../../../components/form/textarea/InputTextArea';
import { PublicationCreateInput } from '../PublicationCreateDataContainer';

export interface PublicationCreateProps {
    isAddingPublication: boolean,
    onAddingChange: (adding: boolean) => void,
    handlePost: (publication: Publication) => void,
    loading: boolean,
    onLoadingChange: (loading: boolean) => void,
    register: UseFormRegister<PublicationCreateInput>,
    handleSubmit: UseFormHandleSubmit<PublicationCreateInput>,
    categories: Category[],
    onSubmit: (data: PublicationCreateInput) => void,
    category: string
}

const PublicationCreate: FunctionComponent<PublicationCreateProps> = (
    {
        isAddingPublication,
        onAddingChange,
        handlePost,
        loading,
        onLoadingChange,
        register,
        handleSubmit,
        categories,
        onSubmit,
        category
    }
) => {


    if (!isAddingPublication) return null

    if (!categories)
        return <div className="loading"><Spinner animation="border"/></div>

    const getSubCategories = () => {
        const defaultOption = <option value={"-1"} key={"select -1"}>Seleccionar subcategoria</option>
        const subCategories = categories.find(cat => cat.name === category)?.subcategories?.map((subcategory, index) => {
            return <option value={subcategory.name} key={subcategory.name+index}>{subcategory.name}</option>
        })
        return [defaultOption, ...subCategories || []]
    }

    const renderCategories = categories.map((category, index) => {
        return <option value={category.name} key={category.name+index}>{category.name}</option>
    })

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
                    <Button variant="secondary" type="button" onClick={() => /*handleShow(false)*/{}}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PublicationCreate