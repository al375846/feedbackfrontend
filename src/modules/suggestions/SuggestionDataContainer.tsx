import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CredentialsContext from '../../contexts/CredentialsContext'
import { Category } from '../../entities/Category'
import { CategoryCreateOptions } from '../profiles/admin/CreateCategoryDataContainer'
import { ProfileRepository } from '../profiles/repository/ProfileRepository'
import SuggestionView from './SuggestionView'

export type SuggestionCreateInput = {
    name: string,
    description: string,
    type: string,
    category: string
}

export enum SuggestionTypes {
    CATEGORY = 'category',
    UPGRADE = 'upgrade'
}

const SuggestionDataContainer = () => {

    const { register, handleSubmit, reset, watch } = useForm<SuggestionCreateInput>()
    const category = watch('category')
    const type = watch('type')
    const [ categories, setCategories ] = useState<Category[]>()
    const [ alert, setAlert ] = useState<boolean>(false)
    const [ variant, setVariant ] = useState<string>('')
    const [ message, setMessage ] = useState<string>('')

    const credentials = useContext(CredentialsContext)
    const repository = new ProfileRepository()

    const handleAlert = (alert: boolean) => setAlert(alert)

    useEffect(() => {
        if (!categories)
            repository.getCategories(credentials.token)
            .then(res => setCategories(res.data.categories))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, credentials.token])

    const ShowAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const onSubmit = (data: SuggestionCreateInput) => {

        const parent = category === CategoryCreateOptions.DEFAULT || type !== SuggestionTypes.CATEGORY
            ? null 
            : {name: category}

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

    return (
        <SuggestionView 
            categories={categories}
            alert={alert}
            handleAlert={handleAlert}
            variant={variant}
            message={message}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            type={type}/>
    )
}

export default SuggestionDataContainer