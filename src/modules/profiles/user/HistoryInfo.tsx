import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { Spinner } from 'react-bootstrap'
import HistoryCard from '../../../components/cards/HistoryCard';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { History } from '../../../entities/History';
import { ProfileRepository } from '../repository/ProfileRepository';
import './ProfileTotal.css'

interface HistoryInfoProps {

}

const HistoryInfo: FunctionComponent<HistoryInfoProps> = () => {

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, credentials.usertype, history])

    if (loading || !history)
        return <div><Spinner animation="border" /></div>

    const renderHistory = history.map((history, index) => {
        return <HistoryCard 
                key={index}
                history={history}/>
    })

    return (
        <div className="history-list">
            {renderHistory}
        </div>
    )
}

export default HistoryInfo