import React, { FunctionComponent } from 'react'
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form'
import { Feedback, FeedbackCreateInput } from '../../../entities/Feedback'
import { Publication } from '../../../entities/Publication'
import PublicationFeedbacks from './components/PublicationFeedbacks'

interface PublicationFeedbackViewProps {
    publication: Publication | undefined
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

const PublicationFeedbackView: FunctionComponent<PublicationFeedbackViewProps> = (
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
    return (
        <div>
            <PublicationFeedbacks 
            publication={publication}
            feedbacks={feedbacks}
            loading={loading}
            alert={alert}
            showCreate={showCreate}
            handleCreate={handleCreate}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleRatingClick={handleRatingClick}
            usertype={usertype}
            username={username}
            downloadFile={downloadFile}/>
        </div>
    )
}

export default PublicationFeedbackView
