import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import PublicationCard from '../../../components/cards/PublicationCard'
import PaginationContainer from '../../../components/pagination/PaginationContainer'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { Publication } from '../../../entities/Publication'
import { PublicationRepository, PublicationResponseData } from '../repository/PublicationRepository'

interface PublicationListDetailsProps {
    finalSearchTerm: string,
    selected: number
}

const PublicationListDetails: FunctionComponent<PublicationListDetailsProps> = (
    {
        finalSearchTerm,
        selected
    }
) => {

    const [ publications, setPublications ] = useState<Array<Publication>>([])
    const [ itemSize, setItemsize ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(1)
    const [ left, setLeft ] = useState<number>(0)
    const [ cursor, setCursor ] = useState<number>(-1)
    const [ loading, setLoading ] = useState<boolean>();
    const publicationRepository = new PublicationRepository();
    const credentials = useContext(CredentialsContext);

    const handleSearch = (data: PublicationResponseData) => {
        setPublications(data.publications)
        if (cursor === -1) {
            setItemsize(data.itemSize)
            setLeft(data.leftSize)
            setCursor(data.publications[0].id + 1) 
        }
        else {
            setItemsize(data.itemSize)
            setLeft((page - 1)*data.itemSize + data.leftSize) 
        }
    }

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalSearchTerm, credentials.token, selected, page, cursor])
    
    const pubs = publications.map((publication) => {
        return <PublicationCard 
                    key={publication.id}
                    publication={publication} />
    })

    if (loading)
    return <div className="loading"><Spinner animation="border"/></div>

    return (
        <>
            <div className="publication-list">
                {pubs}
            </div>
            <div className="pagination">
                <PaginationContainer 
                setPage={setPage}
                page={page}
                totalPages={Math.ceil((left+itemSize) / itemSize)}
                />
            </div>
        </>
    )
}

export default PublicationListDetails