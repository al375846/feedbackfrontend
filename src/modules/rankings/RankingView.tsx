import React, { FunctionComponent } from 'react'
import { Ranking } from '../../entities/Ranking'
import RankingInfo from './components/RankingInfo'

interface RankingViewProps {
    ratedExperts: Ranking[] | undefined,
    activeExperts: Ranking[] | undefined,
    activeCategories: Ranking[] | undefined
}

const RankingView: FunctionComponent<RankingViewProps> = (
    {
        ratedExperts,
        activeExperts,
        activeCategories
    }
) => {
    return (
        <div>
            <RankingInfo 
            ratedExperts={ratedExperts}
            activeExperts={activeExperts}
            activeCategories={activeCategories}/>
        </div>
    )
}

export default RankingView
