import React from 'react'
import { RouteComponentProps } from 'react-router'
import { PublicationDetailsStore } from '../../../contexts/PublicationDetailsContext'
import PublicationFeedbackDataContainer from './PublicationFeedbackDataContainer'
import PublicationInfoDataContainer from './PublicationInfoDataContainer'

type PublicationInfoParams = {
    id: string
}

const PublicationInfoScreen = (
    {
        match
    }: RouteComponentProps<PublicationInfoParams>
) => {
    return (
        <div>
            <PublicationDetailsStore>
                <PublicationInfoDataContainer id={match.params.id}/>
                <PublicationFeedbackDataContainer id={match.params.id}/>
            </PublicationDetailsStore>
        </div>
    )
}

export default PublicationInfoScreen