import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Feedback } from '../../../entities/Feedback'
import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import FeedbackCreate from './FeedbackCreate'
import FeedbackCard from './FeedbackCard'
import { Publication } from '../../../entities/Publication'
import { PublicationRepository } from '../repository/PublicationRepository'

export interface PublicationFeedbacksProps {
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    publication: Publication,
    showAlert: (message: string) => void
}

const PublicationFeedbacks = (props: PublicationFeedbacksProps) => {
    
    const [feedbacks, setFeedbacks] = useState<Feedback[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const credentials = useContext(CredentialsContext);

    const repository = new PublicationRepository();

    const postFeedback = (feedback: Feedback) => {
        const newFeedbacks = [feedback, ...feedbacks || []]
        setFeedbacks(newFeedbacks)
        props.showAlert('Feedback creado con éxito')
    }

    useEffect(() => {

        const searchFeedbacks = () => {
            setLoading(true)
            repository.getPublicationFeedbacks(props.publication.id, credentials.token)
            .then(res => setFeedbacks(res.data.feedbacks))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !feedbacks)
            searchFeedbacks()

    }, [feedbacks, credentials.token, props.publication.id])

    if (loading || !feedbacks)
        return <div><Spinner animation="border"/></div> 

    const renderfeedbacks = feedbacks.map((feedback) => {
        return <FeedbackCard 
                    key={feedback.id} 
                    feedback={feedback} 
                    username={props.publication.apprentice.username}
                />
    })

    return (
        <div>
            {renderfeedbacks}
            <FeedbackCreate 
                visible={props.visible} 
                publicationId={props.publication.id} 
                setShowCreate={props.setShowCreate} 
                postFeedback={postFeedback}
            />
        </div>
    )
}

export default PublicationFeedbacks