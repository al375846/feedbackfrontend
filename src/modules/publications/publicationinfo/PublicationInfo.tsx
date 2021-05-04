import React, {ReactNode, useContext, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Alert, Badge, Button, Spinner} from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import {Publication} from '../../../entities/Publication'
import './PublicationInfoTotal.css'
import moment from 'moment'
import PublicationFeedbacks from './PublicationFeedbacks'
import FilesInfo from './FilesInfo'
import IncidenceModal from './IncidenceModal'
import {PublicationRepository} from "../repository/PublicationRepository";

type PublicationInfoParams = { id: string }

const PublicationInfo = ({match}: RouteComponentProps<PublicationInfoParams>) => {

    const [publication, setPublication] = useState<Publication>()
    const credentials = useContext(CredentialsContext)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [showIncidence, setShowIncidence] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>();
    const publicationRepository = new PublicationRepository();

    /*
        1 - OK Sacar la llamada a otro fichero
        2 - Mejorar la gestión de los loadings
        3 - Abstracción de un componente para la vista y otro para obtener los datos de la publicación
     */
    useEffect(() => {
        const searchPublication = async () => {
            setLoading(true);
            publicationRepository.findById(match.params.id, credentials.token)
                // @ts-ignore
                .then((res) => setPublication(res.data.publication))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false));
        }

        if (credentials.token && !publication)
            searchPublication()

    }, [publication, credentials.token, match.params.id])

    const renderTags = (): ReactNode | null => {
        if (publication) {
            return (
                publication.tags.map(tag => (
                    <span className="render-tags" key={tag}>
                            <Badge variant="secondary">{tag}</Badge>
                        </span>
                ))
            );
        }

        return null;
    }

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

    const files = [...publication?.images ?? [], ...publication?.video ?? [], ...publication?.document ?? []];

    if (loading) {
        return (
            <div className="loading">
                <Spinner animation="border"/>
            </div>
        )
    }

    if (publication) {
        return (
            <div>
                <div className="publication-report">
                    <i className="big exclamation circle icon" onClick={() => setShowIncidence(true)}></i>
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
                            <div className="text tags">{renderTags}</div>
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
                                    {/*{publication.apprentice.username}*/}
                                </p>
                            </div>
                        </Badge>
                    </h3>
                </div>
                <br/>
                <div className="ui secondary pointing menu">
                    <div className="item">
                        <h1>Respuestas</h1>
                    </div>
                    <div className="right menu">
                        {renderPostFeedback()}
                    </div>
                </div>
                <PublicationFeedbacks
                    visible={showCreate}
                    setShowCreate={setShowCreate}
                    publication={publication}
                    setAlert={setAlert}
                />
                <IncidenceModal show={showIncidence} setShow={setShowIncidence} id={match.params.id}/>
                <div className="feedback-created">
                    <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                        Feedback creado con exito
                    </Alert>
                </div>
            </div>
        );
    }

    return <h1>Please login</h1>;
}

export default PublicationInfo
