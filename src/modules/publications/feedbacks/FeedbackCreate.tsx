import React, { FunctionComponent} from 'react'
import { Button, Form } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import '../detail/components/PublicationInfoTotal.css'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import InputFile from '../../../components/form/files/InputFile'
import { FeedbackCreateInput } from '../detail/PublicationFeedbackDataContainer'


export interface FeedbackCreateProps {
    showCreate: boolean,
    handleCreate: (create: boolean) => void,
    register: UseFormRegister<FeedbackCreateInput>,
    handleSubmit: UseFormHandleSubmit<FeedbackCreateInput>,
    onSubmit: (data: FeedbackCreateInput) => void,
}

const FeedbackCreate: FunctionComponent<FeedbackCreateProps> = (
    {
        showCreate,
        handleCreate,
        register,
        handleSubmit,
        onSubmit,
    }
) => {

    if (!showCreate) return null

    return (
        <div className="feedback-form">
            <div className="create-form">
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <InputTextArea 
                        name={"feedback-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        input={'description'}
                        register={register}
                    />

                    <InputFile
                        name={"feedback-files"}
                        label={"Files"}
                        accept={"application/pdf,video/mp4,image/jpg,image/jpeg,image/png"}
                        register={register}
                        input={'files'}
                    />

                    <Button variant="primary" type="submit" className="submit-button">
                        Submit
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => handleCreate(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default FeedbackCreate