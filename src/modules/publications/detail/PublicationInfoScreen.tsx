import React from 'react'
import { useParams } from 'react-router'
import { PublicationDetailsStore } from '../../../contexts/PublicationDetailsContext'
import PublicationFeedbackDataContainer from './PublicationFeedbackDataContainer'
import PublicationInfoDataContainer from './PublicationInfoDataContainer'

interface PublicationSreenParams {
    id: string
}

const PublicationInfoScreen = () => {

    const id = useParams<PublicationSreenParams>().id

    return (
        <div>
            <PublicationDetailsStore>
                <PublicationInfoDataContainer id={id}/>
                <PublicationFeedbackDataContainer id={id}/>
            </PublicationDetailsStore>
        </div>
    )
}

export default PublicationInfoScreen