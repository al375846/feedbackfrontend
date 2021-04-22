import React, { useState, useEffect, useContext } from 'react'

import { Publication } from '../../entities/Publication'
import PublicationCard from './PublicationCard'
import './PublicationList.css'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import { Button } from 'react-bootstrap'
import PublicationCreate from './PublicationCreate'
import CategoryMenu from './CategoryMenu'

const PublicationList = () => {

    const [publications, setPublications] = useState<Array<Publication>>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [finalSearchTerm, setFinalSearchTerm] = useState<string>('')
    const [cursor, setCursor] = useState<number>(-1)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [selected, setSelected] = useState(-2)

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

            let url: string = '/api/publication'
            if (selected === -1)
                url = '/api/publication/expert'
            else if (selected >= 0)
                url = `/api/publication/category/${selected}`

            const {data} = await api.get(url, {
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

    }, [finalSearchTerm, cursor, credentials.token, selected])

    const pubs = publications.map((publication) => {
        return (
            <div key={publication.id}>
                <PublicationCard publication={publication} />
            </div>
        )
    })

    const postPublication = (publication: Publication) => {
        publications.push(publication)
        publications.sort((a, b) => {
            if(a.id < b.id)
                return 1;
            else
                return -1;
        })
        if (publications.length > 25)
            publications.splice(publications.length - 1, 1)
    }

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
            <CategoryMenu setSelected={setSelected} selected={selected}/>
            <div className="publication-list">
                {pubs}
            </div>
            <PublicationCreate visible={showCreate} setShowCreate={setShowCreate} postPublication={postPublication}/>
        </div>
    )
}

export default PublicationList