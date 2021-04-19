import React, { useState, useEffect, useContext } from 'react'

import { Publication } from '../../entities/Publication'
import PublicationCard from '../publicationcard/PublicationCard'
import './PublicationList.css'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import { Button } from 'react-bootstrap'
import PublicationCreate from '../createpublication/PublicationCreate'

const PublicationList = () => {

    const [publications, setPublications] = useState<Array<Publication>>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [finalSearchTerm, setFinalSearchTerm] = useState<string>('')
    const [cursor, setCursor] = useState<number>(-1)
    const [showCreate, setShowCreate] = useState<boolean>(false)

    const credentials = useContext(CredentialsContext)

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
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setPublications(data.publications)
        }

        if (credentials.token)
            searchPublications()

    }, [finalSearchTerm, cursor, credentials.token])

    const pubs = publications.map((publication) => {
        return (
            <div key={publication.id}>
                <PublicationCard publication={publication} />
            </div>
        )
    })

    const renderSearch = () => {
        if (credentials.usertype === 'apprentice')
            return (
                <div className="ui form">
                <div className="ui fluid icon input" style={{marginRight: '13em'}}>
                    <input value={searchTerm} placeholder="Search publications" type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                    <i className="search icon"></i>
                </div>
                <div className="add-publication">
                    <Button onClick={() => {setShowCreate(!showCreate)}}>
                    Post your publication
                    </Button>  
                </div>
            </div>
            )
        else
            return (
                <div className="ui form">
                <div className="ui fluid icon input">
                    <input value={searchTerm} placeholder="Search publications" type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                    <i className="search icon"></i>
                </div>
            </div>
            )
    }

    return (
        <div>
            {renderSearch()}
            <div className="publication-list">
                {pubs}
            </div>
            <PublicationCreate visible={showCreate}/>
        </div>
    )
}

export default PublicationList