import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

import { Feedback } from '../../../entities/Feedback'
import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import { Rate } from '../../../entities/Rate'
import FilesInfo from './FilesInfo'
import { PublicationRepository, RatePostParams, RatePutParams } from '../repository/PublicationRepository'

export interface FeedbackCardProps {
    feedback: Feedback,
    username: string
}

const FeedbackCard = (props: FeedbackCardProps) => {

    const credentials = useContext(CredentialsContext);
    const [rating, setRating] = useState<Rate | null>(props.feedback.valoration);
    const repository = new PublicationRepository();

    useEffect(() => {}, [rating])

    const files = [...props.feedback.images, ...props.feedback.video, ...props.feedback.document]

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

    const getoutline = (pos: number) => {
        return (!rating || rating.grade < pos) ? 'outline' : ''
    }

    const renderstars = () => {
        let rendered = []
        if (props.username === credentials.username)
            for (let i = 0; i < 5; i++)
                rendered.push(<i key={`star${i}`} className={`star ${getoutline(i + 1)} icon`} onClick={() => handleRatingClick(i + 1)}></i>)
        return rendered
    }

    return (
        <div key={props.feedback.id}>
            <Card className="feedback-card" >
                <Card.Header>
                    <div className="ui secondary menu">
                        <div className="item">
                            <i className="user icon" />
                            {props.feedback.expert.username}
                        </div>
                        <div className="right menu item">
                            <div className="rating">
                            {renderstars()}
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="content">
                        <div className="comment">
                            <div className="content">
                                <div className="text">{props.feedback.description}</div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
                <FilesInfo files={files}/>
                <small className="text-muted">
                    <div className="ui secondary menu">
                        <div className="metadata item">
                        <span className="date">
                            {moment(props.feedback.date).format('D MMM YYYY HH:mm:ss')}
                        </span>
                        </div>
                    </div>
                </small>
            </Card>
        </div>
    )
}

export default FeedbackCard