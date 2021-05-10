import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

import { History } from '../../entities/History';

interface HistoryCardProps {
    history: History
};

const HistoryCard: FunctionComponent<HistoryCardProps> = (
    {
        history
    }
) => {

    const contenido = history.content.charAt(0) === '*'
        ? history.content.replace('*', '<i>').replace('*', '</i>')
        : history.content.replace('*', '<i>').slice(0, history.content.length + 1)
            
        return (
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
        )
}

export default HistoryCard