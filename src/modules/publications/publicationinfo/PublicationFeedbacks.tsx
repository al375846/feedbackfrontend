import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Feedback } from '../../../entities/Feedback'
import CredentialsContext from '../../../contexts/CredentialsContext'
import api from '../../../api/Api'
import './PublicationInfoTotal.css'
import FeedbackCreate from './FeedbackCreate'
import FeedbackCard from './FeedbackCard'
import { Publication } from '../../../entities/Publication'

export interface PublicationFeedbacksProps {
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    publication: Publication,
    setAlert: React.Dispatch<React.SetStateAction<boolean>>
}

const PublicationFeedbacks = (props: PublicationFeedbacksProps) => {
    
    const [feedbacks, setFeedbacks] = useState<Feedback[]>()
    const credentials = useContext(CredentialsContext)

    const searchFeedbacks = async () => {
        const {data} = await api.get(`/api/publication/${props.publication.id}/feedback`, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })
        setFeedbacks(data.feedbacks)
    }

    useEffect(() => {

        if (credentials.token && !feedbacks)
            searchFeedbacks()

    }, [feedbacks, credentials.token, props.publication.id])

    if (!feedbacks)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const postFeedback = () => {
        searchFeedbacks()
        props.setAlert(true)
        setTimeout(() => {
            props.setAlert(false)
        }, 3000)
    }

    const renderfeedbacks = feedbacks.map((feedback) => {
        return (
            <FeedbackCard feedback={feedback} username={props.publication.apprentice.username}/>
        )
    })

    return (
        <div>
            {renderfeedbacks}
            <FeedbackCreate visible={props.visible} publication={props.publication.id} 
            setShowCreate={props.setShowCreate} postFeedback={postFeedback}/>
        </div>
    )
}

export default PublicationFeedbacks