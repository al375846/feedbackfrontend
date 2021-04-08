import moment from 'moment';
import React from 'react'
import { Publication } from '../../entities/Publication';

interface PublicationCardState {
 }

 interface PublicationCardProps {
    publication: Publication
}

const formatDate = (date: Date): string => {
    return moment(date).format('LLL');
}

class PublicationCard extends React.Component<PublicationCardProps, PublicationCardState> {
    render() {
        return (
        <div className="ui card">
                <div className="content">
                    <div className="comment" key={this.props.publication.id}>
                        <div className="content">
                            <div className="avatar">
                                {this.props.publication.apprentice.username}
                            </div>
                        <div className="metadata">
                            <span className="date">{formatDate(this.props.publication.date)}</span>
                        </div>
                        <div className="text">{this.props.publication.title}</div>
                        <div className="text">{this.props.publication.description}</div>
                        <div className="text">{this.props.publication.tags}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicationCard