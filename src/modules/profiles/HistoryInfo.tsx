import React, { useContext, useEffect, useState } from 'react'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Card, Spinner } from 'react-bootstrap'
import {History} from '../../entities/History'
import './ProfileTotal.css'
import moment from 'moment'
import { ProfileRepository } from './repository/ProfileRepository'

const HistoryInfo = () => {

    const credentials = useContext(CredentialsContext);
    const [ history, setHistory ] = useState<History[]>();
    const repository = new ProfileRepository();
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {

        const searchHistory = () => {
            setLoading(true)
            repository.getHistory(credentials.usertype, credentials.token)
            .then(res => setHistory(res.data.history))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !history)
            searchHistory()

    }, [credentials.token, credentials.usertype, history])

    if (loading || !history)
        return <div><Spinner animation="border" /></div>

    const renderHistory = history.map((history, index) => {
        const contenido = history.content.charAt(0) === '*'
        ? history.content.replace('*', '<i>').replace('*', '</i>')
        : history.content.replace('*', '<i>').slice(0, history.content.length + 1)
            
        return (
            <div key={index}>
                <Card>
                    <Card.Header>
                        <div className="history-type">
                            {history.type}
                        </div>
                        <div className="history-date">
                            {(moment(history.date)).startOf('hour').fromNow()}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div dangerouslySetInnerHTML={{__html: contenido}}></div>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div className="history-list">
            {renderHistory}
        </div>
    )
}

export default HistoryInfo