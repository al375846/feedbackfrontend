import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Category } from '../../entities/Category'
import { SuggestionCreateInput } from '../../entities/Suggestion'
import SuggestionCreate from './components/SuggestionCreate'

interface SuggestionViewProps {
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

const SuggestionView: FunctionComponent<SuggestionViewProps> = (
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

    return (
        <SuggestionCreate 
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

export default SuggestionView
