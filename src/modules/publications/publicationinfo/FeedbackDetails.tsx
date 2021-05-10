import React, { useContext, useEffect, useState } from 'react'

import { Feedback } from '../../../entities/Feedback'
import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import { Rate } from '../../../entities/Rate'
import { PublicationRepository, RatePostParams, RatePutParams } from '../repository/PublicationRepository'
import FeedbackCard from '../../../components/cards/FeedbackCard'

export interface FeedbackCardProps {
    feedback: Feedback,
    username: string
}

const FeedbackDetails = (props: FeedbackCardProps) => {

    const credentials = useContext(CredentialsContext);
    const [ rating, setRating ] = useState<Rate | null>(props.feedback.valoration);
    const repository = new PublicationRepository();

    useEffect(() => {}, [rating])

    const handleRatingClick = (rate: number) => {
        if (!rating) {
            const rateData: RatePostParams = {
                grade: rate,
                date: new Date()
            }
            repository.rateFeedback(props.feedback.id, rateData, credentials.token)
            .then(res => setRating(res.data.rating))
            .catch(err => window.alert(err))
            .finally(() => {})
        }
        else {
            const rateData: RatePutParams = {
                grade: rate,
            }
            repository.updateRateFeedback(rating.id, rateData, credentials.token)
            .then(res => setRating(res.data.rating))
            .catch(err => window.alert(err))
            .finally(() => {})
        }
    }

    return <FeedbackCard 
            feedback={props.feedback}
            rating={rating}
            handleRatingClick={handleRatingClick}
            username={props.username}/>
}

export default FeedbackDetails