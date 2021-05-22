import React, { FunctionComponent } from 'react'

import { Spinner } from 'react-bootstrap'
import HistoryCard from './HistoryCard'
import { History } from '../../../../entities/History'
import './ProfileTotal.css'

interface HistoryInfoProps {
    history: History[] | undefined
}

const HistoryInfo: FunctionComponent<HistoryInfoProps> = (
    {
        history
    }
) => {

    if (!history)
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