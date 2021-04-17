import React, { useContext, useEffect, useState } from 'react'

import { Feedback } from '../../entities/Feedback'
import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
import { Spinner } from 'react-bootstrap'

export interface PublicationFeedbacksProps {
    id: number
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
            console.log(data)
            setFeedbacks(data.feedbacks)
        }

        if (credentials.token && !feedbacks)
            searchFeedbacks()

    }, [feedbacks])

    if (!feedbacks)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    return (
        <div>
            Answers
        </div>
    )
}

export default PublicationFeedbacks