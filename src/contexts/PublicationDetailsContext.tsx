import React, { useState } from 'react'

import { Publication } from '../entities/Publication'


export interface PublicationDetailsData {
    publication: Publication | undefined,
    onPublicationChange: (publication: Publication) => void
}

const PublicationDetailsContext = React.createContext<PublicationDetailsData>({
    publication: undefined, onPublicationChange: () => null
})

export const PublicationDetailsProvaider = PublicationDetailsContext.Provider

export interface PublicationDetailsStoreProps {
    children: JSX.Element[]
}

export const PublicationDetailsStore = (props: PublicationDetailsStoreProps) => {
    const [publication, setPublication] = useState<Publication>()

    const onPublicationChange = (publication: Publication) => {
        setPublication(publication)
    }

    return (
        <PublicationDetailsContext.Provider value={{publication: publication, onPublicationChange: onPublicationChange}}>
            {props.children}
        </PublicationDetailsContext.Provider>
    )
}

export default PublicationDetailsContext
