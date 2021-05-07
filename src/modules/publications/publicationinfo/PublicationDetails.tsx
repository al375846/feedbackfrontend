import moment from 'moment'
import React from 'react'
import { Badge } from 'react-bootstrap'

import { Publication } from '../../../entities/Publication'
import FilesInfo from './FilesInfo'
import './PublicationInfoTotal.css'

interface PublicationDetailsProps {
    publication: Publication,
    showModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PublicationDetails = (props: PublicationDetailsProps) => {

    const files = [...props.publication.images, ...props.publication.video, ...props.publication.document];

    const renderedTags = props.publication.tags.map(tag => {
        return (
            <span className="render-tags" key={tag}>
                <Badge variant="secondary">{tag}</Badge>
            </span>
            )
    });

    return (
        <>
        <div className="publication-report">
                <i className="big exclamation circle icon" onClick={() => props.showModal(true)}></i>
            </div>
            <div className="ui header">
                <h1>{props.publication.title}</h1>
            </div>
            <hr/>
            <div className="content">
                <div className="comment">
                    <div className="content">
                        <div className="text">{props.publication.description}</div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="comment">
                    <div className="content">
                        <div className="text tags">{renderedTags}</div>
                    </div>
                </div>
            </div>
            <br/>
            <FilesInfo files={files}/>
            <br/>
            <div className="user-tag">
                <h3>
                    <Badge variant="info">
                        <div>
                            <p style={{fontSize: '0.6em'}}>
                                {moment(props.publication.date).format('D MMM YYYY HH:mm:ss')}
                            </p>
                        </div>
                        <div>
                            <p style={{fontSize: '0.8em'}}>
                                {props.publication.apprentice.username}
                            </p>
                        </div>
                    </Badge>
                </h3>
            </div>
            <br/>
        </>
    )
}

export default PublicationDetails