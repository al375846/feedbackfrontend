import React, { useContext, useEffect, useState } from 'react'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
import { Card, Spinner } from 'react-bootstrap'
import {History} from '../../entities/History'
import './ProfileTotal.css'
import moment from 'moment'

const HistoryInfo = () => {

    const credentials = useContext(CredentialsContext)
    const [history, setHistory] = useState<History[]>()

    useEffect(() => {

        const searchHistory = async () => {
            const {data} = await api.get(`/api/${credentials.usertype}/history`, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setHistory(data.history)
            
        }

        if (credentials.token && !history)
            searchHistory()

    }, [credentials.token, credentials.usertype, history])

    if (!history)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const renderHistory = history.map((history, index) => {
        let contenido: string = ''
        if (history.content.charAt(0) === '*')
            contenido = history.content.replace('*', '<i>').replace('*', '</i>')
        else
            contenido = history.content.replace('*', '<i>').slice(0, history.content.length + 1)
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