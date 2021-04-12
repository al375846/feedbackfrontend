import React, { useContext, useEffect, useState } from 'react'
import TokenContext from '../../contexts/TokenContext'
import { Feedback } from '../../entities/Feedback'
import api from '../../api/Api'

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState<Array<Feedback>>([])
    const [cursor, setCursor] = useState<number>(-1)

    const token = useContext<string>(TokenContext)

    useEffect(() => {
        const searchFeedbacks = async () => {
            const {data} = await api.get('/api/publication', {
                params: {
                    cursor: cursor,
                },
                headers: {
                    Authorization: `Bearer ${token}`
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
            Feedbacks
        </div>
    )
}

export default FeedbackList