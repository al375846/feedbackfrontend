import React, { useState, useEffect, useContext } from 'react'

import { Publication } from '../../../entities/Publication'
import PublicationCard from './PublicationCard'
import './PublicationTotal.css'
import api from '../../../api/Api'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { Alert, Button, Pagination } from 'react-bootstrap'
import PublicationCreate from './PublicationCreate'
import CategoryMenu from './CategoryMenu'

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
    const [pagination, setPagination] = useState<JSX.Element[]>()

    const credentials = useContext(CredentialsContext)

    const searchPublications = async () => {

        let url: string = '/api/publication'
        if (selected === -1)
            url = '/api/publication/expert'
        else if (selected >= 0)
            url = `/api/publication/category/${selected}`

        const {data} = await api.get(url, {
            params: {
                cursor: cursor,
                page: page,
                filter: finalSearchTerm
            },
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        setPublications(data.publications)
        if (cursor === -1) {
            setItemsize(data.itemSize)
            setLeft(data.leftSize)
            setCursor(data.publications[0].id + 1) 
        }
               
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
        const pag = []
        const total = Math.ceil((left + itemSize) / itemSize)
        for (let number = 1; number <= total; number++) {
            pag.push(
            <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
                {number}
            </Pagination.Item>,
            )
        }
        setPagination(pag)
    }, [selected, finalSearchTerm, page, left, itemSize])

    useEffect(() => {
        setCursor(-1)
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
                {pagination}
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