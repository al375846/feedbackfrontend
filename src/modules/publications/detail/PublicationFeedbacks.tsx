import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Feedback } from '../../../entities/Feedback'
import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import FeedbackCreate from './FeedbackCreate'
import FeedbackDetails from './FeedbackDetails'
import { Publication } from '../../../entities/Publication'
import { PublicationRepository } from '../repository/PublicationRepository'

export interface PublicationFeedbacksProps {
    visible: boolean,
    handleCreate: (bool: boolean) => void,
    publication: Publication,
    showAlert: (message: string) => void
}

const PublicationFeedbacks: FunctionComponent<PublicationFeedbacksProps> = (
    {
        visible,
        handleCreate,
        publication,
        showAlert
    }
) => {
    
    const [ feedbacks, setFeedbacks ] = useState<Feedback[]>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const credentials = useContext(CredentialsContext);

    const repository = new PublicationRepository();

    const postFeedback = (feedback: Feedback) => {
        const newFeedbacks = [feedback, ...feedbacks || []]
        setFeedbacks(newFeedbacks)
        showAlert('Feedback creado con éxito')
    }

    useEffect(() => {

        const searchFeedbacks = () => {
            setLoading(true)
            repository.getPublicationFeedbacks(publication.id, credentials.token)
            .then(res => setFeedbacks(res.data.feedbacks))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !feedbacks)
            searchFeedbacks()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedbacks, credentials.token, publication.id])

    if (loading || !feedbacks)
        return <div><Spinner animation="border"/></div> 

    const renderfeedbacks = feedbacks.map((feedback) => {
        return <FeedbackDetails 
                    key={feedback.id} 
                    feedback={feedback} 
                    username={publication.apprentice.username}/>
    })

    return (
        <div>
            {renderfeedbacks}
            <FeedbackCreate 
                visible={visible} 
                publicationId={publication.id} 
                handleCreate={handleCreate} 
                postFeedback={postFeedback}/>
        </div>
    )
}

export default PublicationFeedbacks