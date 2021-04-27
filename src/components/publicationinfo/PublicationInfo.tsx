import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Alert, Badge, Button, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Publication } from '../../entities/Publication'
import api from '../../api/Api'
import './PublicationInfoTotal.css'
import moment from 'moment'
import PublicationFeedbacks from './PublicationFeedbacks'
import FilesInfo from './FilesInfo'
import IncidenceModal from './IncidenceModal'

type PublicationInfoParams = {id: string}

const PublicationInfo = ({match}: RouteComponentProps<PublicationInfoParams>) => {

    const [publication, setPublication] = useState<Publication>()
    const credentials = useContext(CredentialsContext)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [showIncidence, setShowIncidence] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)

    useEffect(() => {
        const searchPublication = async () => {
            const {data} = await api.get(`/api/publication/${match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setPublication(data.publication)
        }

        if (credentials.token && !publication)
            searchPublication()
            
    }, [publication, credentials.token, match.params.id])
    
    if (!publication)
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div> 
        )

    const renderTags = publication.tags.map((tag) => {
        return (
            <span className="render-tags" key={tag}>
            <Badge variant="secondary">{tag}</Badge>
            </span>
        )
    })

    const renderPostFeedback = () => {
        if (credentials.usertype === 'expert')
            return (
                <div className="item">
                <Button onClick={() => setShowCreate(!showCreate)}>
                    Give feedback
                </Button>
                </div>
            )
    }

    const files = [...publication.images, ...publication.video, ...publication.document]

    return (
        <div>
            <div className="publication-report">
                <i className="big exclamation circle icon" onClick={() => setShowIncidence(true)}></i>
            </div>
            <div className="ui header">
                <h1>{publication.title}</h1>
            </div>
            <hr />
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
                        <div className="text tags">{renderTags}</div>
                    </div>
                </div>
            </div>
            <br />
            <FilesInfo files={files}/>
            <br />
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
            <br />
            <div className="ui secondary pointing menu">
                <div className="item">
                    <h1>Respuestas</h1>
                </div>
                <div className="right menu">
                {renderPostFeedback()}
                </div>
            </div>
                <PublicationFeedbacks visible={showCreate} setShowCreate={setShowCreate} publication={publication} setAlert={setAlert}/>
                <IncidenceModal show={showIncidence} setShow={setShowIncidence} id={match.params.id}/>
                <div className="feedback-created">
                <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                    Feedback creado con exito
                </Alert>
                </div>
        </div>
    )
}

export default PublicationInfo