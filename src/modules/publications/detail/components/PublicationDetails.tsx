import moment from 'moment'
import React, { FunctionComponent, useContext } from 'react'
import { Badge } from 'react-bootstrap'

import CredentialsContext from '../../../../contexts/CredentialsContext'
import { Publication } from '../../../../entities/Publication'
import FilesInfo from '../../files/FilesInfo'

interface PublicationDetailsProps {
    publication: Publication,
    handleIncidence: (bool: boolean) => void,
    downloadFile: (filename: string) => void
}

const PublicationDetails: FunctionComponent<PublicationDetailsProps> = (
    {
        publication,
        handleIncidence,
        downloadFile
    }
) => {

    const credentials = useContext(CredentialsContext)

    const renderIncidence = () => {
        if (credentials.username !== publication.apprentice.username)
            return <i className="big exclamation circle icon" 
                    onClick={() => handleIncidence(true)}></i>
        return null
    }

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
            {renderIncidence()}
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
            <FilesInfo files={files} downloadFile={downloadFile}/>
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