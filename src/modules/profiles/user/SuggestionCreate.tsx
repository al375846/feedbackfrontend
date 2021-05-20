import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'

import { useForm } from 'react-hook-form'
import InputForm from '../../../components/form/input/InputForm'
import InputRadio from '../../../components/form/radio/InputRadio'
import InputSelect from '../../../components/form/select/InputSelect'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { Category } from '../../../entities/Category'
import { ProfileRepository } from '../repository/ProfileRepository'

type SuggestionCreateInput = {
    name: string,
    description: string,
    type: string,
    category: string
}

interface SuggestionCreateProps {

}

const SuggestionCreate: FunctionComponent<SuggestionCreateProps> = () => {

    const credentials = useContext(CredentialsContext);
    const { register, handleSubmit, reset, watch } = useForm<SuggestionCreateInput>();
    const category = watch('category');
    const type = watch('type');
    const [ categories, setCategories ] = useState<Category[]>();
    const [ alert, setAlert ] = useState<boolean>(false);
    const [ variant, setVariant ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const repository = new ProfileRepository();

    const radioValues = [
        {
            id: "category",
            label: "Category",
            value: "category"
        },
        {
            id: "upgrade",
            label: "Upgrade",
            value: "upgrade"
        }
    ]

    useEffect(() => {
        const searchCategories = () => {
            repository.getCategories(credentials.token)
            .then(res => setCategories(res.data.categories))
            .catch(err => window.alert(err))
        }

        if (credentials.token && !categories)
            searchCategories()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, credentials.token])

    const getCategories = () => {
        const defaultOption = <option value={"-1"} key={"select -1"}>Seleccionar categoria</option>
        const renderCategories = categories?.map((category, index) => {
            return <option value={category.name} key={category.name+index}>{category.name}</option>
        })
        return [defaultOption, ...renderCategories || []]
    }

    const renderparent = () => {
        return type === 'category' 
        ? <InputSelect 
                name={"suggestion-category"}
                label={"Category"}
                options={getCategories()}
                input={'category'}
                register={register}
            /> 
        : null
    }

    const ShowAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const onSubmit = (data: SuggestionCreateInput) => {

        const parent = category === "-1" || type !== 'category' ? null : {name: category}

        const suggestionData = {
            name: data.name,
            type: data.type,
            description: data.description,
            parent: parent,
            date: new Date()
        }

        repository.postSuggestion(suggestionData, credentials.token)
        .then(() => {
            setVariant('success')
            setMessage('Sugerencia enviada')
            reset({name:'', description:'', type:''})
        })
        .catch(() => {
            setVariant('danger')
            setMessage('El nombre de la sugerencia ya existe')
        })
        .finally(() => ShowAlert())  
    }

    if (!categories)
        return <div><Spinner animation="border" /></div>

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
                onClose={() => setAlert(false)} dismissible={true}>
                {message}
            </Alert>
        </div>
    )
}

export default SuggestionCreate