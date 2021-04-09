import React, { useState, useEffect } from 'react'
import { Publication } from '../../entities/Publication'
import PublicationCard from '../publicationcard/PublicationCard'
import './PublicationList.css'
import api from '../../api/Api'

interface PublicationListProps {
    token: string
}

const PublicationList = (props: PublicationListProps) => {

    const [publications, setPublications] = useState<Publication[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [finalSearchTerm, setFinalSearchTerm] = useState<string>('')
    const [cursor, setCursor] = useState<number>(-1)

    useEffect(() => {
        const time = setTimeout( () => {
            setFinalSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }
    }, [searchTerm])

    useEffect(() => {
        const searchPublications = async () => {
            const {data} = await api.get('/api/publication', {
                params: {
                    cursor: cursor,
                    filter: finalSearchTerm
                },
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })

            setPublications(data.publications)
        }

        searchPublications()

    }, [finalSearchTerm])

    const pubs = publications.map((publication) => {
        return (
            <PublicationCard key={publication.id} publication={publication}/>
        )
    })

    return (
        <div>
            <div className="ui form">
                    <div className="field">
                    <label>Search the publications</label>
                    <input value={searchTerm} type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>
                    </div>
            </div>
            <div className="publication-list">
                {pubs}
            </div>
        </div>
    )
}

export default PublicationList