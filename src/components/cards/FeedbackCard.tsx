import moment from 'moment';
import React, { FunctionComponent, useContext } from 'react';
import { Card } from 'react-bootstrap';
import CredentialsContext from '../../contexts/CredentialsContext';

import { Feedback } from '../../entities/Feedback';
import { Rate } from '../../entities/Rate';
import FilesInfo from '../../modules/publications/publicationinfo/FilesInfo';

interface FeedbackCardProps {
    feedback: Feedback,
    handleRatingClick: (rate: number) => void,
    rating: Rate | null
    username: string
};

const FeedbackCard: FunctionComponent<FeedbackCardProps> = (
    {
        feedback,
        handleRatingClick,
        rating,
        username
    }
) => {

    const credentials = useContext(CredentialsContext)

    const getoutline = (pos: number) => {
        return (!rating || rating.grade < pos) ? 'outline' : ''
    }

    const renderstars = () => {
        let rendered = []
        if (username === credentials.username)
            for (let i = 0; i < 5; i++)
                rendered.push(<i key={`star${i}`} className={`star ${getoutline(i + 1)} icon`} onClick={() => handleRatingClick(i + 1)}></i>)
        return rendered
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
            <FilesInfo files={files}/>
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

export default FeedbackCard