import React, { FunctionComponent } from 'react';
import { Spinner } from 'react-bootstrap';
import RankingCard from '../../components/cards/RankingCard';

import { Ranking } from '../../entities/Ranking';
import './RankingDetails.css';

export interface RankingDetailsProps {
    type: string,
    ranking: Ranking[] | undefined
};

const RankingDetails: FunctionComponent<RankingDetailsProps> = (
    {
        type,
        ranking
    }
) => {

    if ( !ranking )
        return <div><Spinner animation="border"/></div>;

    const orderfirst = [ranking[1], ranking[0], ranking[2]];
    const rest = ranking.slice(3);

    const renderfirst = orderfirst.map((rank, index) => {
        return <RankingCard 
                    key={index}
                    rank={rank}
                    index={index}
                    type={type}
                    top={true}/>
    });

    const renderrest = rest.map((rank, index) => {
        return <RankingCard 
                    key={index}
                    rank={rank}
                    index={index}
                    type={type}
                    top={false}/>
    });

    return (
        <div>
            <div className="ranking">
                {renderfirst}
            </div>
            <div className="rest">
                {renderrest}
            </div>
        </div>
        
    );
}

export default RankingDetails