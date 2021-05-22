import React, { FunctionComponent } from 'react'
import moment from 'moment';
import { Publication } from '../../../../entities/Publication';
import { Link } from 'react-router-dom';
import { Badge, Card } from 'react-bootstrap';

 interface PublicationCardProps {
    publication: Publication
}

const PublicationCard: FunctionComponent<PublicationCardProps> = (
    {
        publication
    }
) => {

    const renderTags = publication.tags.map((tag) => {
        return (
            <span className="render-tags" key={tag}>
            <Badge variant="secondary">{tag}</Badge>
            </span>
        )
    })

    return (
        <Card className="publication-card">
            <Card.Header>
                <div className="ui secondary menu">
                    <Link to={`/publication/${publication.id.toString()}`} className="item">
                        {publication.title}
                    </Link>
                    <div className=" item">
                        {publication.category.name}
                    </div>
                    <div className="right menu item">
                        <i className="user icon" />
                        {publication.apprentice.username}
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text">{publication.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
                <div className="tags-text">
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text tags">{renderTags}</div>
                        </div>
                    </div>
                </div>
                </div>
                <small className="text-muted">
                    <div className="ui secondary menu">
                        <div className="metadata item">
                        <span className="date">
                            {moment(publication.date).format('D MMM YYYY HH:mm:ss')}
                        </span>
                        </div>
                        <div className="right menu item">
                            <Badge pill variant="primary">{publication.document.length}</Badge><span className="sr-only">documents</span>
                            <i className="file alternate outline icon"></i>
                            <Badge pill variant="primary">{publication.video.length}</Badge><span className="sr-only">videos</span>
                            <i className="video icon"></i>
                            <Badge pill variant="primary">{publication.images.length}</Badge><span className="sr-only">images</span>
                            <i className="image outline icon"></i>
                        </div>
                    </div>
                </small> 
        </Card>
    )
}

export default PublicationCard