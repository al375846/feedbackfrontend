import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

import { Feedback } from '../../entities/Feedback'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import './PublicationInfoTotal.css'
import { Rate } from '../../entities/Rate'
import FilesInfo from './FilesInfo'

export interface FeedbackCardProps {
    feedback: Feedback,
    username: string
}

const FeedbackCard = (props: FeedbackCardProps) => {

    const credentials = useContext(CredentialsContext)
    const [rating, setRating] = useState<Rate | null>(props.feedback.valoration)

    useEffect(() => {}, [rating])

    const files = [...props.feedback.images, ...props.feedback.video, ...props.feedback.document]

    const handleRatingClick = async(rate: number) => {
        if (!rating) {
            const ratedata = {
                grade: rate,
                date: new Date()
              }
            const {data} = await api.post(`/api/rating/feedback/${props.feedback.id}`, ratedata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setRating(data.rating)
        }
        else {
            const ratedata = {
                grade: rate,
              }
            const {data} = await api.put(`/api/rating/feedback/${rating.id}`, ratedata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setRating(data.rating)
        }
    }

    const getoutline = (pos: number) => {
        if (!rating)
            return 'outline'
        else if (pos <= rating.grade)
            return ''
        else
            return 'outline'
    }

    const renderstars = () => {
        let rendered = []
        if (props.username === credentials.username)
            for (let i = 0; i < 5; i++)
                rendered.push(<i className={`star ${getoutline(i + 1)} icon`} onClick={() => handleRatingClick(i + 1)}></i>)
        return rendered
    }

    return (
        <Card className="feedback-card" key={props.feedback.id}>
            <Card.Header>
                <div className="ui secondary menu">
                    <div className="item">
                        <div className="rating">
                        {renderstars()}
                        </div>
                    </div>
                    <div className="right menu item">
                        <i className="user icon" />
                        {props.feedback.expert.username}
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
    )
}

export default FeedbackCard