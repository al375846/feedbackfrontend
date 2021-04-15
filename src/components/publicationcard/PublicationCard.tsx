import React from 'react'
import moment from 'moment';
import { Publication } from '../../entities/Publication';
import './PublicationCard.css'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

 interface PublicationCardProps {
    publication: Publication
}

const PublicationCard = (props: PublicationCardProps) => {

    const formatDate = (date: Date): string => {
        return moment(date).format('LLL');
    }

    return (
        <Card>
            <Card.Body>
                <div className="content">
                    <div className="comment" key={props.publication.id}>
                        <div className="content">
                            <div className="avatar">
                                <span>
                                <Link to={`/publication/${props.publication.id.toString()}`} className="item">
                                {props.publication.title}
                                </Link>
                                *
                                <i className="user icon" />
                                {props.publication.apprentice.username}
                                </span>
                            </div>
                        <div className="metadata">
                            <span className="date">{formatDate(props.publication.date)}</span>
                        </div>
                        <div className="text">{props.publication.description}</div>
                        <div className="text">{props.publication.tags}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default PublicationCard