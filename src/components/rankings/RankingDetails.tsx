import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Ranking } from '../../entities/Ranking'
import api from '../../api/Api'
import './RankingDetails.css'

export interface RankingDetailsProps {
    type: string
}

const RankingDetails = (props: RankingDetailsProps) => {

    const [ranking, setRanking] = useState<Ranking[]>()
    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const searchRanking = async () => {
            const {data} = await api.get(`/api/ranking/${props.type}`, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setRanking(data.ranking)
        }

        if (credentials.token && !ranking)
            searchRanking()

    }, [ranking, credentials.token, props.type])

    if (!ranking)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const first = ranking.slice(0, 3)
    const orderfirst = [first[1], first[0], first[2]]
    const rest = ranking.slice(3)

    let text: string
    if (props.type === 'rated/experts')
        text = 'Rate: '
    else if (props.type === 'active/experts')
        text = 'Feedbacks given: '
    else
        text = 'Publications: '

    const renderfirst = orderfirst.map((rank, index) => {
        let img: string
        if (index === 1)
            img = 'gold-medal.png'
        else if (index === 0)
            img = 'silver-medal.png'
        else
            img = 'bronze-medal.png'
        return (
            <div className="top-ranking" key={rank.id}>
            <Card>
                <Card.Img variant="top" src={`/images/${img}`} />
                <Card.Body>
                    <Card.Title>{rank.name}</Card.Title>
                    <Card.Text>
                    {text + rank.rate}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    })

    const renderrest = rest.map((rank) => {
        return (
            <div>
            <Card>
                <Card.Body>
                    <Card.Title>{rank.name}</Card.Title>
                    <Card.Text>
                    {rank.rate}
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