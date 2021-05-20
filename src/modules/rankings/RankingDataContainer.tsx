import React, { useContext, useEffect, useState } from 'react'
import CredentialsContext from '../../contexts/CredentialsContext'
import { Ranking } from '../../entities/Ranking'
import RankingView from './RankingView';
import { RankingRepository } from './repository/RankingRepository'

const RankingDataContainer = () => {

    const [ ratedExperts, setRatedExperts ] = useState<Ranking[]>()
    const [ activeExperts, setActiveExperts ] = useState<Ranking[]>()
    const [ activeCategories, setActiveCategories ] = useState<Ranking[]>()
    const credentials = useContext(CredentialsContext)
    const repository = new RankingRepository()

    useEffect(() => {
        if (!ratedExperts)
            repository.getRanking("rated/experts", credentials.token)
            .then(res => setRatedExperts(res.data.ranking))
            .catch(err => window.alert(err))

        if (!activeExperts)
            repository.getRanking("active/experts", credentials.token)
            .then(res => setActiveExperts(res.data.ranking))
            .catch(err => window.alert(err))

        if (!activeCategories)
            repository.getRanking("active/categories", credentials.token)
            .then(res => setActiveCategories(res.data.ranking))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ratedExperts, activeExperts, activeCategories, credentials.token]);

    return (
        <RankingView 
        ratedExperts={ratedExperts}
        activeExperts={activeExperts}
        activeCategories={activeCategories}/>
    )
}

export default RankingDataContainer
