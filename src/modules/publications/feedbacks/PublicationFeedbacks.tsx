import React, { FunctionComponent} from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'

import { Feedback } from '../../../entities/Feedback'
import '../detail/components/PublicationInfoTotal.css'
import FeedbackCreate from './FeedbackCreate'
import FeedbackDetails from './FeedbackDetails'
import { Publication } from '../../../entities/Publication'
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form'

import { isExpert } from '../../../contexts/CredentialsContext'
import { FeedbackCreateInput } from '../detail/PublicationFeedbackDataContainer'

export interface PublicationFeedbacksProps {
    publication: Publication | undefined,
    feedbacks: Feedback[] | undefined,
    loading: boolean,
    alert: boolean,
    showCreate: boolean,
    handleCreate: (create: boolean) => void,
    register: UseFormRegister<FeedbackCreateInput>,
    handleSubmit: UseFormHandleSubmit<FeedbackCreateInput>,
    onSubmit: (data: FeedbackCreateInput) => void,
    handleRatingClick: (feedback: Feedback, rate: number) => void,
    usertype: string,
    username: string,
    downloadFile: (filename: string) => void
}

const PublicationFeedbacks: FunctionComponent<PublicationFeedbacksProps> = (
    {
        publication,
        feedbacks,
        loading,
        alert,
        showCreate,
        handleCreate,
        register,
        handleSubmit,
        onSubmit,
        handleRatingClick,
        usertype,
        username,
        downloadFile
    }
) => {

    if (loading || !feedbacks)
        return <div><Spinner animation="border"/></div> 

    const renderfeedbacks = feedbacks.map((feedback) => {
        return <FeedbackDetails 
                    key={feedback.id} 
                    feedback={feedback} 
                    username={publication?.apprentice.username}
                    credentials={username}
                    handleRatingClick={handleRatingClick}
                    downloadFile={downloadFile}/>
    })

    const renderPostFeedback = () => {
        if (isExpert(usertype))
            return (
                <div className="item">
                    <Button onClick={() => handleCreate(!showCreate)}>
                        Give feedback
                    </Button>
                </div>
            )
    }

    return (
        <div>
            <div className="ui secondary pointing menu">
                <div className="item">
                    <h1>Respuestas</h1>
                </div>
                <div className="right menu">
                    {renderPostFeedback()}
                </div>
            </div>
            {renderfeedbacks}
            <FeedbackCreate 
                showCreate={showCreate} 
                handleCreate={handleCreate} 
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}/>

            <div className="created">
                <Alert variant="success" show={alert}>
                    Feedback creado con éxito
                </Alert>
            </div>
        </div>
    )
}

export default PublicationFeedbacks