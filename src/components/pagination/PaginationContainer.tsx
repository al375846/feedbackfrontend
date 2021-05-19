import React, { FunctionComponent } from 'react'
import { Pagination } from 'react-bootstrap'

interface PaginationProps {
    totalPages: number
    setPage: (value: number) => void,
    page: number
}

const PaginationContainer: FunctionComponent<PaginationProps> = (
    {
        totalPages,
        setPage,
        page
    }
) => {

    const searchNext = () => {
        if (page !== totalPages)
            setPage(page + 1)
    }
    const searchLast = () => {
        if (page !== totalPages)
            setPage(totalPages)
    }

    const searchPrev = () => {
        if (page !== 1)
            setPage(page - 1)
    }
    const searchFirst = () => {
        if (page !== 1)
            setPage(1)
    }

    if (totalPages === 1)
        return (
            <Pagination>
                <Pagination.Prev />
                <Pagination.Item active={true}>{1}</Pagination.Item>
                <Pagination.Next />
            </Pagination>
        )

    return (
        <Pagination>
            <Pagination.Prev onClick={searchPrev}/>
            <Pagination.Item onClick={searchFirst} active={page === 1}>{1}</Pagination.Item>
            {page > 3 ? <Pagination.Ellipsis /> : null}
            {page === totalPages && totalPages > 3 
            ? <Pagination.Item onClick={() => {setPage(page - 2)}}>{page - 2}</Pagination.Item>
            : null
            }
            {page > 2
            ? <Pagination.Item onClick={() => {setPage(page - 1)}}>{page - 1}</Pagination.Item>
            : null
            }
            {page !== 1 && page !== totalPages
            ? <Pagination.Item onClick={() => {setPage(page)}} active={page !== 1 && page !== totalPages}>{page}</Pagination.Item>
            : null
            }
            {page < totalPages - 1
            ? <Pagination.Item onClick={() => {setPage(page + 1)}}>{page + 1}</Pagination.Item>
            : null
            }
            {page === 1 && totalPages > 3
            ? <Pagination.Item onClick={() => {setPage(page + 2)}}>{page + 2}</Pagination.Item>
            : null
            }
            {page < totalPages - 2 ? <Pagination.Ellipsis /> : null}
            <Pagination.Item onClick={searchLast} active={page === totalPages}>{totalPages}</Pagination.Item>
            <Pagination.Next onClick={searchNext}/>
        </Pagination>
    )
}

export default PaginationContainer