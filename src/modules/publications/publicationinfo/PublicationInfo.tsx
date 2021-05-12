import React, {useContext, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Alert, Button, Spinner} from 'react-bootstrap'

import CredentialsContext from '../../../contexts/CredentialsContext'
import {Publication} from '../../../entities/Publication'
import './PublicationInfoTotal.css'
import PublicationFeedbacks from './PublicationFeedbacks'
import IncidenceModal from './IncidenceModal'
import {PublicationRepository} from "../repository/PublicationRepository";
import PublicationDetails from '../../../components/cards/PublicationDetails'

type PublicationInfoParams = { id: string }

const PublicationInfo = ({match}: RouteComponentProps<PublicationInfoParams>) => {

    const [ publication, setPublication ] = useState<Publication>();
    const credentials = useContext(CredentialsContext);
    const [ showCreate, setShowCreate ] = useState<boolean>(false);
    const [ showIncidence, setShowIncidence ] = useState<boolean>(false);
    const [ alert, setAlert ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>('Feedback creado con exito');
    const [ loading, setLoading ] = useState<boolean>();
    const publicationRepository = new PublicationRepository();

    const handleCreate = (bool: boolean) => setShowCreate(bool)

    const handleIncidence = (bool: boolean) => setShowIncidence(bool)

    const showAlert = (message: string) => {
        setMessage(message);
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    useEffect(() => {
        const searchPublication = () => {
            setLoading(true);
            publicationRepository.findById(match.params.id, credentials.token)
                .then((res) => setPublication(res.data.publication))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false));
        }

        if (credentials.token && !publication)
            searchPublication()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, credentials.token, match.params.id])

    const renderPostFeedback = () => {
        if (credentials.usertype === 'expert')
            return (
                <div className="item">
                    <Button onClick={() => setShowCreate(!showCreate)}>
                        Give feedback
                    </Button>
                </div>
            )
    };

    if (loading || !publication)
        return <div className="loading"><Spinner animation="border"/></div>

    return (
        <div>
            <PublicationDetails 
                publication={publication}
                handleIncidence={handleIncidence}/>

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
                handleCreate={handleCreate}
                publication={publication}
                showAlert={showAlert}/>

            <IncidenceModal 
                show={showIncidence} 
                handleIncidence={handleIncidence} 
                showAlert={showAlert} 
                id={match.params.id}/>

            <div className="feedback-created">
                <Alert variant="success" show={alert} 
                    onClose={() => setAlert(false)} dismissible={true}>
                    {message}
                </Alert>
            </div>
        </div>
    );
    
}

export default PublicationInfo