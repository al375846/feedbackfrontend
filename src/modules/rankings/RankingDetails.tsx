import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import RankingCard from '../../components/cards/RankingCard';

import CredentialsContext from '../../contexts/CredentialsContext';
import { Ranking } from '../../entities/Ranking';
import './RankingDetails.css';
import { RankingRepository } from './repository/RankingRepository';

export interface RankingDetailsProps {
    type: string
};

const RankingDetails = (props: RankingDetailsProps) => {

    const [ ranking, setRanking ] = useState<Ranking[]>();
    const credentials = useContext(CredentialsContext);
    const repository = new RankingRepository();
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        const searchRanking = () => {
            setLoading(true)
            repository.getRanking(props.type, credentials.token)
            .then(res => setRanking(res.data.ranking))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        };

        if (credentials.token && !ranking)
            searchRanking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ranking, credentials.token, props.type]);

    if ( loading || !ranking )
        return <div><Spinner animation="border"/></div>;

    const first = ranking.slice(0, 3);
    const orderfirst = [first[1], first[0], first[2]];
    const rest = ranking.slice(3);

    const renderfirst = orderfirst.map((rank, index) => {
        return <RankingCard 
                    key={index}
                    rank={rank}
                    index={index}
                    type={props.type}
                    top={true}
                />
    });

    const renderrest = rest.map((rank, index) => {
        return <RankingCard 
                    key={index}
                    rank={rank}
                    index={index}
                    type={props.type}
                    top={false}
                />
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