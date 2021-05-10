import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Button, Pagination, Spinner } from 'react-bootstrap'

import { Publication } from '../../../entities/Publication'
import PublicationCard from './PublicationCard'
import './PublicationTotal.css'
import CredentialsContext from '../../../contexts/CredentialsContext'
import PublicationCreate from './PublicationCreate'
import CategoryMenu from './CategoryMenu'
import { PublicationRepository, PublicationResponseData } from '../repository/PublicationRepository'

const PublicationList = () => {

    const [publications, setPublications] = useState<Array<Publication>>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [finalSearchTerm, setFinalSearchTerm] = useState<string>('')
    const [cursor, setCursor] = useState<number>(-1)
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [selected, setSelected] = useState(-2)
    const [itemSize, setItemsize] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [left, setLeft] = useState<number>(0)
    
    const [loading, setLoading] = useState<boolean>();
    const publicationRepository = new PublicationRepository();

    const history = useHistory();

    const credentials = useContext(CredentialsContext)

    const handleSearch = (data: PublicationResponseData) => {
        setPublications(data.publications)
        if (cursor === -1) {
            setItemsize(data.itemSize)
            setLeft(data.leftSize)
            setCursor(data.publications[0].id + 1) 
        }
    }

    const navigateToPublication = (id: number) => history.push(`/publication/${id}`)

    const postPublication = (publication: Publication) => navigateToPublication(publication.id)

    const renderPost = () => {
        if (credentials.usertype === 'apprentice')
            return (
                <div className="add-publication">
                    <Button onClick={() => {setShowCreate(!showCreate)}}>
                    Post your publication
                    </Button>  
                </div>
            )
    }

    const searchNext = () => {
        if (page !== Math.ceil((left + itemSize) / itemSize))
            setPage(page + 1)
    }
    const searchLast = () => {
        if (page !== Math.ceil((left + itemSize) / itemSize))
            setPage(Math.ceil((left + itemSize) / itemSize))
    }

    const searchPrev = () => {
        if (page !== 1)
            setPage(page - 1)
    }
    const searchFirst = () => {
        if (page !== 1)
            setPage(1)
    }

    useEffect(() => {
        const time = setTimeout( () => {
            setFinalSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }
    }, [searchTerm])

    useEffect(() => {

        const searchPublications = () => {

            const getParams =  {
                cursor: cursor,
                page: page,
                filter: finalSearchTerm
            }

            setLoading(true);
            if (selected === -1)
                publicationRepository.findAllByExpert(getParams, credentials.token)
                .then((res) => handleSearch(res.data))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false));
            else if (selected >= 0)
                publicationRepository.findAllByCategory(selected, getParams, credentials.token)
                .then((res) => handleSearch(res.data))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false));
            else
                publicationRepository.findAll(getParams, credentials.token)
                .then((res) => handleSearch(res.data))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false));            
        }

        if (credentials.token)
            searchPublications()

    }, [finalSearchTerm, credentials.token, selected, page])

    useEffect(() => {
        setCursor(-1)
        setPage(1)
    }, [selected, finalSearchTerm])

    if (!credentials.token)
        return <div style={{textAlign: 'center'}}><h1>Please Login or register</h1></div>

    if (loading)
        return <div className="loading"><Spinner animation="border"/></div>

    const pubs = publications.map((publication) => {
        return <PublicationCard 
                    key={publication.id}
                    publication={publication} />
    })

    return (
        <div className="parent-div">
            <div className="ui form">
                <div className={`ui fluid icon input ${credentials.usertype === 'apprentice' ? 'posting' : ''}`}>
                    <input value={searchTerm} placeholder="Search publications" 
                    type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                    <i className="search icon"></i>
                </div>
                {renderPost()}
            </div>
            <CategoryMenu setSelected={setSelected} selected={selected}/>
            <div className="publication-list">
                {pubs}
            </div>
            <div className="paginator">
                <Pagination>
                <Pagination.First onClick={searchFirst}/>
                <Pagination.Prev onClick={searchPrev}/>
                {/*pagination*/}
                <Pagination.Next onClick={searchNext}/>
                <Pagination.Last  onClick={searchLast}/>
                </Pagination>
            </div>
            <PublicationCreate visible={showCreate} setShowCreate={setShowCreate} postPublication={postPublication}/>
        </div>
    )
}

export default PublicationList