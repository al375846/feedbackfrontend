import React, { useContext, useEffect, useState } from 'react'

import { Feedback } from '../../entities/Feedback'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState<Array<Feedback>>([])
    const [cursor, setCursor] = useState<number>(-1)

    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const searchFeedbacks = async () => {
            const {data} = await api.get('/api/feedback', {
                params: {
                    cursor: cursor,
                },
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setFeedbacks(data.feedbacks)
        }

        searchFeedbacks()
    }, [cursor])

    const feeds = feedbacks.map((feedback) => {
        return (
            <div>
                Feedback {feedback.id}
            </div>
        )
    })

    return (
        <div>
            {feeds}
        </div>
    )
}

export default FeedbackList