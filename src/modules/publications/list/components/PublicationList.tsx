import React, { FunctionComponent} from 'react'
import { Spinner } from 'react-bootstrap'

import PublicationCard from '../../../../components/cards/PublicationCard'
import PaginationContainer from '../../../../components/pagination/PaginationContainer'
import { Publication } from '../../../../entities/Publication'

interface PublicationListProps {
    itemSize: number,
    left: number,
    page: number,
    publications: Publication[],
    loading: boolean,
    onPageChange: (page: number) => void
}

const PublicationList: FunctionComponent<PublicationListProps> = (
    {
        itemSize,
        left,
        page,
        publications,
        loading,
        onPageChange
    }
) => {
    
    const pubs = publications.map((publication) => {
        return <PublicationCard 
                    key={publication.id}
                    publication={publication} />
    })

    if (loading)
        return <div className="loading"><Spinner animation="border"/></div>
    
    if (publications.length === 0)
        return (
            <div style={{textAlign: 'center', marginTop: '2em'}}>
                No hay publicaciones que coincidan con los filtros aplicados
            </div>
        )

    return (
        <>
            <div className="publication-list">
                {pubs}
            </div>
            <div className="pagination">
                <PaginationContainer 
                    setPage={onPageChange}
                    page={page}
                    totalPages={Math.ceil((left+itemSize) / itemSize)}
                />
            </div>
        </>
    )
}

export default PublicationList