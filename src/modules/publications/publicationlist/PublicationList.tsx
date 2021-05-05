import React, { useState, useEffect, useContext } from 'react'

import { Publication } from '../../../entities/Publication'
import PublicationCard from './PublicationCard'
import './PublicationTotal.css'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { Alert, Button, Pagination, Spinner } from 'react-bootstrap'
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
    const [alert, setAlert] = useState<boolean>(false)
    
    const [loading, setLoading] = useState<boolean>();
    const publicationRepository = new PublicationRepository();

    const credentials = useContext(CredentialsContext)

    const handleSearch = (data: PublicationResponseData) => {
        setPublications(data.publications)
        if (cursor === -1) {
            setItemsize(data.itemSize)
            setLeft(data.leftSize)
            setCursor(data.publications[0].id + 1) 
        }
    }

    const searchPublications = async () => {

        const getParams = {
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

    useEffect(() => {
        const time = setTimeout( () => {
            setFinalSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }
    }, [searchTerm])

    useEffect(() => {

        if (credentials.token)
            searchPublications()

    }, [finalSearchTerm, credentials.token, selected, page])

    useEffect(() => {
        setCursor(-1)
        setPage(1)
    }, [selected, finalSearchTerm])

    const pubs = publications.map((publication) => {
        return (
            <div key={publication.id}>
                <PublicationCard publication={publication} />
            </div>
        )
    })

    const postPublication = () => {
        searchPublications()
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

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
        console.log("Antes" + page)
        if (page !== Math.ceil((left + itemSize) / itemSize))
            setPage(page + 1)
            console.log("Despues" + page)
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

    if (loading) {
        return (
            <div className="loading">
                <Spinner animation="border"/>
            </div>
        )
    }

    return (
        <div>
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
            <div className="publication-created">
                <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                    Publicación creada con exito
                </Alert>
            </div>
        </div>
    )
}

export default PublicationList