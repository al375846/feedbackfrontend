import React from 'react'
import { RouteComponentProps } from 'react-router-dom'


type PublicationInfoParams = {id: string}

const PublicationInfo = ({match}: RouteComponentProps<PublicationInfoParams>) => {

console.log(match)

    return (
        <div>
            {match.params.id}
            Info
        </div>
    )
}

export default PublicationInfo