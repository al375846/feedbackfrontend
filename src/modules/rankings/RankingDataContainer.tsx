import React, { useEffect, useState } from 'react'
import { Ranking } from '../../entities/Ranking'
import RankingView from './RankingView';
import { RankingRepository } from './repository/RankingRepository'

const RankingDataContainer = () => {

    const [ ratedExperts, setRatedExperts ] = useState<Ranking[]>()
    const [ activeExperts, setActiveExperts ] = useState<Ranking[]>()
    const [ activeCategories, setActiveCategories ] = useState<Ranking[]>()
    const repository = new RankingRepository()

    useEffect(() => {
        if (!ratedExperts)
            repository.getRanking("rated/experts")
            .then(res => setRatedExperts(res.data.ranking))
            .catch(err => window.alert(err))

        if (!activeExperts)
            repository.getRanking("active/experts")
            .then(res => setActiveExperts(res.data.ranking))
            .catch(err => window.alert(err))

        if (!activeCategories)
            repository.getRanking("active/categories")
            .then(res => setActiveCategories(res.data.ranking))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ratedExperts, activeExperts, activeCategories]);

    return (
        <RankingView 
        ratedExperts={ratedExperts}
        activeExperts={activeExperts}
        activeCategories={activeCategories}/>
    )
}

export default RankingDataContainer
