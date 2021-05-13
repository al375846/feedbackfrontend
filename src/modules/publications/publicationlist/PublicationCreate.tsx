import React, { useState, useEffect, useContext, FunctionComponent } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useForm } from "react-hook-form";

import CredentialsContext from '../../../contexts/CredentialsContext'
import { Category } from '../../../entities/Category'
import './PublicationTotal.css'
import { PublicationPostParams, PublicationRepository } from '../repository/PublicationRepository'
import { Publication } from '../../../entities/Publication'
import InputForm from '../../../components/form/input/InputForm';
import InputFile from '../../../components/form/files/InputFile';
import InputSelect from '../../../components/form/select/InputSelect';
import InputTextArea from '../../../components/form/textarea/InputTextArea';

export interface PublicationCreateProps {
    visible: boolean,
    handleShow: (show: boolean) => void,
    postPublication: (publication: Publication) => void
}

type PublicationCreateInput = {
    title: string,
    tags: string,
    description: string,
    category: string,
    subcategory: string,
    files: FileList
}

const PublicationCreate: FunctionComponent<PublicationCreateProps> = (
    {
        visible,
        handleShow,
        postPublication
    }
) => {

    const [ categories, setCategories ] = useState<Category[]>();
    const credentials = useContext(CredentialsContext);
    const { register, handleSubmit, watch } = useForm<PublicationCreateInput>();
    const category = watch('category');
    const subcategory = watch('subcategory');
    const repository = new PublicationRepository();
    const [ loading, setLoading ] = useState<boolean>(false);

    const handlePost = (publication: Publication) => {
        handleShow(false);
        postPublication(publication);
        setLoading(false);
    }

    useEffect(() => {

        const searchCategories = () => {
            repository.getCategories(credentials.token)
            .then(res => setCategories(res.data.categories))
            .catch(err => window.alert(err))
            .finally(() => {})
        }

        if (credentials.token && !categories)
            searchCategories()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, credentials.token])

    if (!visible) return null

    if (!categories)
        return <div className="loading"><Spinner animation="border"/></div>

    const getSubCategories = () => {
        const defaultOption = <option value={"-1"} key={"select -1"}>Seleccionar subcategoria</option>
        const subCategories = categories.find(cat => cat.name === category)?.children?.map((subcategory, index) => {
            return <option value={subcategory.name} key={subcategory.name+index}>{subcategory.name}</option>
        })
        return [defaultOption, ...subCategories || []]
    }

    const renderCategories = categories.map((category, index) => {
        return <option value={category.name} key={category.name+index}>{category.name}</option>
    })

    const onSubmit = (data: PublicationCreateInput) => {
        const categorypost = subcategory === "-1" ? category : subcategory

        const publicationData: PublicationPostParams = {
            title: data.title,
            category: {name: categorypost},
            tags: data.tags.split(' '),
            description: data.description,
            date: new Date()
        };
        
        setLoading(true)
        let publication: Publication
        repository.postPublication(publicationData, credentials.token)
        .then(res => {
            publication = res.data.publication;
            if (data.files) {
                const filesData = new FormData();
                for (let i = 0; i < data.files.length; i++)
                    filesData.append(data.files[i].name, data.files[i], data.files[i].name)
                repository.postPublicationFiles(publication.id, filesData, credentials.token)
                .then(() => handlePost(publication))
                .catch(err => window.alert(err))
            }
            else {
                handlePost(publication)
            }
        })
        .catch(err => window.alert(err))
    }

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
                    <Button variant="secondary" type="button" onClick={() => handleShow(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PublicationCreate