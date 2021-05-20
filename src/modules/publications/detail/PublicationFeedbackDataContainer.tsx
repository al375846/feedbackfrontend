import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CredentialsContext from '../../../contexts/CredentialsContext'
import PublicationDetailsContext from '../../../contexts/PublicationDetailsContext'
import { Feedback } from '../../../entities/Feedback'
import { dowloandFile } from '../files/FileDownload'
import { PublicationRepository, RatePostParams, RatePutParams } from '../repository/PublicationRepository'
import PublicationFeedbackView from './PublicationFeedbackView'

interface PublicationFeedbackDataContainerProps {
    id: string
}

export type FeedbackCreateInput = {
    description: string,
    files: FileList
}

const PublicationFeedbackDataContainer: FunctionComponent<PublicationFeedbackDataContainerProps> = (
    {
        id
    }
) => {

    const [ feedbacks, setFeedbacks ] = useState<Feedback[]>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ alert, setAlert ] = useState<boolean>(false)
    const [ showCreate, setShowCreate ] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<FeedbackCreateInput>()

    const credentials = useContext(CredentialsContext)
    const publicationContext = useContext(PublicationDetailsContext)
    const repository = new PublicationRepository()

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handleCreate = (create: boolean) => setShowCreate(create)

    const handlePost = (feedback: Feedback) => {
        const newFeedbacks = [feedback, ...feedbacks || []]
        setFeedbacks(newFeedbacks)
        showAlert()
        handleCreate(false);
    }

    useEffect(() => {
        if (!feedbacks){
            setLoading(true)
            repository.getPublicationFeedbacks(id, credentials.token)
            .then(res => setFeedbacks(res.data.feedbacks))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedbacks, credentials.token, id])

    const handleRatingClick = (feedback: Feedback, rate: number) => {
        if (!feedback.valoration) {
            const rateData: RatePostParams = {
                grade: rate,
                date: new Date()
            }
            repository.rateFeedback(feedback.id, rateData, credentials.token)
            .then(res => feedback.valoration = res.data.rating)
            .catch(err => window.alert(err))
            .finally(() => {})
        }
        else {
            const rateData: RatePutParams = {
                grade: rate,
            }
            repository.updateRateFeedback(feedback.valoration.id, rateData, credentials.token)
            .then(res => feedback.valoration = res.data.rating)
            .catch(err => window.alert(err))
            .finally(() => {})
        }
    }

    const downloadFilesFeedback = (filename: string) => dowloandFile(filename, repository)

    const onSubmit = (data: FeedbackCreateInput) => {

        const feedbackData = {
            description: data.description,
            date: new Date()
        }

        let feedback: Feedback
        repository.postPublicationFeedback(id, feedbackData, credentials.token)
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

    return (
        <PublicationFeedbackView 
        publication={publicationContext.publication}
        feedbacks={feedbacks}
        loading={loading}
        alert={alert}
        showCreate={showCreate}
        handleCreate={handleCreate}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleRatingClick={handleRatingClick}
        usertype={credentials.usertype}
        username={credentials.username}
        downloadFile={downloadFilesFeedback}/>
    )
}

export default PublicationFeedbackDataContainer