import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';

import { Ranking } from '../../../entities/Ranking';

interface RankingCardProps {
    top: boolean,
    type: string,
    index: number,
    rank: Ranking
};

const rankinginfo: { [type: string]: string }  = {
    ratedexperts: 'Rate: ',
    activeexperts: 'Feedbacks given: ',
    activecategories: 'Publications: ',
    1: 'gold-medal.png',
    0: 'silver-medal.png',
    2: 'bronze-medal.png'
};

const RankingCard: FunctionComponent<RankingCardProps> = (
    {
        top,
        type,
        index,
        rank
    }
) => {

    const renderTop = () => {
        return top 
            ? <Card.Img 
                    variant="top" 
                    src={`/images/${rankinginfo[index.toString()]}`} 
                    id={'img' + rank.id.toString()}
                />
            : null

    }

    const renderTitle = () => {
        return top
            ? rank.name
            : (index + 4) + '. ' + rank.name
    }

    return(
        <Card className={top ? "top-ranking" : ''} id={'rank' + rank.id.toString()}>
            {renderTop()}
            <Card.Body>
                <Card.Title>{renderTitle()}</Card.Title>
                <Card.Text>
                {rankinginfo[type.replace('/', '')] + rank.rate}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RankingCard