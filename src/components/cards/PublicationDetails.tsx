import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Badge } from 'react-bootstrap'

import { Publication } from '../../entities/Publication'
import FilesInfo from '../../modules/publications/publicationinfo/FilesInfo'

interface PublicationDetailsProps {
    publication: Publication,
    showModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PublicationDetails: FunctionComponent<PublicationDetailsProps> = (
    {
        publication,
        showModal
    }
) => {

    const files = [...publication.images, ...publication.video, ...publication.document];

    const renderedTags = publication.tags.map(tag => {
        return (
            <span className="render-tags" key={tag}>
                <Badge variant="secondary">{tag}</Badge>
            </span>
            )
    });

    return (
        <>
        <div className="publication-report">
                <i className="big exclamation circle icon" onClick={() => showModal(true)}></i>
            </div>
            <div className="ui header">
                <h1>{publication.title}</h1>
            </div>
            <hr/>
            <div className="content">
                <div className="comment">
                    <div className="content">
                        <div className="text">{publication.description}</div>
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
                                {moment(publication.date).format('D MMM YYYY HH:mm:ss')}
                            </p>
                        </div>
                        <div>
                            <p style={{fontSize: '0.8em'}}>
                                {publication.apprentice.username}
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