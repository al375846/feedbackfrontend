import React from 'react'
import moment from 'moment';
import { Publication } from '../../entities/Publication';
import './PublicationCard.css'
import { Link } from 'react-router-dom';
import { Badge, Card } from 'react-bootstrap';

 interface PublicationCardProps {
    publication: Publication
}

const PublicationCard = (props: PublicationCardProps) => {

    const formatDate = (date: Date): string => {
        return moment(date).format('LLL');
    }

    const renderDocuments = () => {
        return props.publication.documents ? props.publication.documents.length : 0
    }

    const renderVideos = () => {
        return props.publication.videos ? props.publication.videos.length : 0
    }

    const renderImages = () => {
        return props.publication.images ? props.publication.images.length : 0
    }

    const renderTags = props.publication.tags.map((tag) => {
        return (
            <span className="render-tags">
            <Badge variant="secondary">{tag}</Badge>
            </span>
        )
    })

    return (
        <Card>
            <Card.Header>
                <div className="ui secondary menu">
                    <Link to={`/publication/${props.publication.id.toString()}`} className="item">
                        {props.publication.title}
                    </Link>
                    <div className=" item">
                        {props.publication.category.name}
                    </div>
                    <div className="right menu item">
                        <i className="user icon" />
                        {props.publication.apprentice.username}
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="content">
                    <div className="comment" key={props.publication.id}>
                        <div className="content">
                            <div className="text">{props.publication.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Text>
                <div className="tags-text">
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text tags">{renderTags}</div>
                        </div>
                    </div>
                </div>
                </div>
            </Card.Text>
            <Card.Text>
                <small className="text-muted">
                    <div className="ui secondary menu">
                        <div className="metadata item">
                        <span className="date">
                            {formatDate(props.publication.date)}
                        </span>
                        </div>
                        <div className="right menu item">
                            <Badge pill variant="primary">{renderDocuments()}</Badge><span className="sr-only">documents</span>
                            <i className="file alternate outline icon"></i>
                            <Badge pill variant="primary">{renderVideos()}</Badge><span className="sr-only">videos</span>
                            <i className="file video outline icon"></i>
                            <Badge pill variant="primary">{renderImages()}</Badge><span className="sr-only">images</span>
                            <i className="image outline icon"></i>
                        </div>
                    </div>
                </small>
            </Card.Text>
        </Card>
    )
}

export default PublicationCard
