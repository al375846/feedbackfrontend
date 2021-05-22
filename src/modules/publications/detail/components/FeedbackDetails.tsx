import React, { FunctionComponent } from 'react'

import './PublicationInfoTotal.css'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { Feedback } from '../../../../entities/Feedback'
import FilesInfo from '../../files/FilesInfo'

export interface FeedbackCardProps {
    feedback: Feedback,
    username: string | undefined,
    handleRatingClick: (feedback: Feedback, rate: number) => void,
    credentials: string,
    downloadFile: (filename: string) => void
}

const FeedbackDetails: FunctionComponent<FeedbackCardProps> = (
    {
        feedback,
        username,
        handleRatingClick,
        credentials,
        downloadFile
    }
) => {

    const getoutline = (pos: number) => {
        return (!feedback.valoration || feedback.valoration.grade < pos) ? 'outline' : ''
    }

    const renderstars = () => {
        let rendered = []
        if (username === credentials)
            for (let i = 0; i < 5; i++)
                rendered.push(<i key={`star${i}`} id={`star${i}`}
                    className={`star ${getoutline(i + 1)} icon`} 
                    onClick={() => {handleRatingClick(feedback, i + 1); updateStars(i + 1)}}></i>)
        return rendered
    }

    const updateStars = (rate: number) => {
        for (let i = 0; i < 5; i++) {
            const star = document.getElementById(`star${i}`) as HTMLElement
            if (i < rate) star.className = 'star icon'
            else star.className = 'star outline icon'
        }
    }

    const files = [...feedback.images, ...feedback.video, ...feedback.document]

    return (
        <Card className="feedback-card" >
            <Card.Header>
                <div className="ui secondary menu">
                    <div className="item">
                        <i className="user icon" />
                        {feedback.expert.username}
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
                            <div className="text">{feedback.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <FilesInfo files={files} downloadFile={downloadFile}/>
            <small className="text-muted">
                <div className="ui secondary menu">
                    <div className="metadata item">
                    <span className="date">
                        {moment(feedback.date).format('D MMM YYYY HH:mm:ss')}
                    </span>
                    </div>
                </div>
            </small>
        </Card>
    )
}

export default FeedbackDetails