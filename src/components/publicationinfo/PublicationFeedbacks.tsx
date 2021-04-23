import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Feedback } from '../../entities/Feedback'
import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
import './PublicationFeedbacks.css'
import FeedbackCreate from './FeedbackCreate'
import FeedbackCard from './FeedbackCard'

export interface PublicationFeedbacksProps {
    id: number,
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
}

const PublicationFeedbacks = (props: PublicationFeedbacksProps) => {
    
    const [feedbacks, setFeedbacks] = useState<Feedback[]>()
    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const searchFeedbacks = async () => {
            const {data} = await api.get(`/api/publication/${props.id}/feedback`, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setFeedbacks(data.feedbacks)
        }

        if (credentials.token && !feedbacks)
            searchFeedbacks()

    }, [feedbacks, credentials.token, props.id])

    if (!feedbacks)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const postFeedback = (feedback: Feedback) => {
        feedbacks.push(feedback)
        feedbacks.sort((a, b) => {
            if(a.id < b.id)
                return 1;
            else
                return -1;
        })
    }

    const renderfeedbacks = feedbacks.map((feedback) => {

        return (
            <FeedbackCard feedback={feedback}/>
        )
    })

    return (
        <div>
            {renderfeedbacks}
            <FeedbackCreate visible={props.visible} publication={props.id} setShowCreate={props.setShowCreate} postFeedback={postFeedback}/>
        </div>
    )
}

export default PublicationFeedbacks