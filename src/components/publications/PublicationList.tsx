import React from 'react'
import { Publication } from '../../entities/Publication'
import PublicationCard from '../publicationcard/PublicationCard'
import './PublicationList.css'

interface PublicationListProps {
    publications: Array<Publication>
}

const PublicationList = (props: PublicationListProps) => {
    const pubs = props.publications.map((publication) => {
        return (
            <PublicationCard key={publication.id} publication={publication}/>
        )
    })

    return (
            <div className="publication-list">
                {pubs}
            </div>
    )
}

export default PublicationList