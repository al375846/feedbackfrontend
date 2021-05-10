import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Ranking } from '../../entities/Ranking'
import './RankingDetails.css'
import { RankingRepository } from './repository/RankingRepository'

export interface RankingDetailsProps {
    type: string
}

const rankinginfo: { [type: string]: string }  = {
    ratedexperts: 'Rate: ',
    activeexperts: 'Feedbacks given: ',
    activecategories: 'Publications: ',
    1: 'gold-medal.png',
    0: 'silver-medal.png',
    2: 'bronze-medal.png'
}

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
        }

        if (credentials.token && !ranking)
            searchRanking()

    }, [ranking, credentials.token, props.type])

    if ( loading || !ranking )
        return <div><Spinner animation="border"/></div>

    const first = ranking.slice(0, 3)
    const orderfirst = [first[1], first[0], first[2]]
    const rest = ranking.slice(3)

    const renderfirst = orderfirst.map((rank, index) => {
        return (
            <div className="top-ranking" key={rank.id}>
            <Card>
                <Card.Img variant="top" src={`/images/${rankinginfo[index.toString()]}`} />
                <Card.Body>
                    <Card.Title>{rank.name}</Card.Title>
                    <Card.Text>
                    {rankinginfo[props.type.replace('/', '')] + rank.rate}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    })

    const renderrest = rest.map((rank, index) => {
        return (
            <div key={rank.id}>
            <Card>
                <Card.Body>
                    <Card.Title>{(index + 4) + '. ' + rank.name}</Card.Title>
                    <Card.Text>
                    {rankinginfo[props.type.replace('/', '')] + rank.rate}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    })

    return (
        <div>
            <div className="ranking">
                {renderfirst}
            </div>
            <div className="rest">
                {renderrest}
            </div>
        </div>
        
    )
}

export default RankingDetails