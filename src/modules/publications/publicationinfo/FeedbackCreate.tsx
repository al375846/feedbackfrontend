import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import { Feedback } from '../../../entities/Feedback'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import InputFile from '../../../components/form/files/InputFile'
import { PublicationRepository } from '../repository/PublicationRepository'

export interface FeedbackCreateProps {
    publicationId: number,
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    postFeedback: (feedback: Feedback) => void
}

type FeedbackCreateInput = {
    description: string,
    files: FileList
}

const FeedbackCreate = (props: FeedbackCreateProps) => {

    const credentials = useContext(CredentialsContext)
    const { register, handleSubmit } = useForm<FeedbackCreateInput>();
    const repository = new PublicationRepository();

    const handlePost = (feedback: Feedback) => {
        props.postFeedback(feedback);
        props.setShowCreate(false);
    }

    const onSubmit = (data: FeedbackCreateInput) => {

        const feedbackData = {
            description: data.description,
            date: new Date()
        }

        let feedback: Feedback
        repository.postPublicationFeedback(props.publicationId, feedbackData, credentials.token)
        .then(res => {
            feedback = res.data.feedback
            if (data.files) {
                const filesData = new FormData()
                for (let i = 0; i < data.files.length; i++)
                    filesData.append(data.files[i].name, data.files[i], data.files[i].name)
                repository.postFeedbackFiles(feedback.id, filesData, credentials.token)
                .then(() => {})
                .catch(err => window.alert(err))
                .finally(() => {})
            }
        })
        .catch(err => window.alert(err))
        .finally(() => {handlePost(feedback)})
    }

    if (!props.visible)
    return <div style={{display: 'none'}}></div>

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

export default FeedbackCreate