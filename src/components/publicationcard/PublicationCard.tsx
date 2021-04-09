import moment from 'moment';
import React from 'react'
import Card from '@material-ui/core/Card'
import { Publication } from '../../entities/Publication';
import './PublicationCard.css'

 interface PublicationCardProps {
    publication: Publication
}

const PublicationCard = (props: PublicationCardProps) => {

    const formatDate = (date: Date): string => {
        return moment(date).format('LLL');
    }

    return (
        <Card>
            <div className="content">
                <div className="comment" key={props.publication.id}>
                    <div className="content">
                        <div className="avatar">
                            <span>
                            {props.publication.title}
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
        </Card>
    )
}

export default PublicationCard