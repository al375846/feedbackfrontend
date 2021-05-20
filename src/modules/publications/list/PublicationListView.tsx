import React, { FunctionComponent } from 'react'
import { CategoryRaw } from '../../../entities/Category'

import { Publication } from '../../../entities/Publication'
import PublicationList from './components/PublicationList'
import PublicationListHeader from './components/PublicationListHeader'

interface PublicationListViewProps {
    handleSearchTerm: (term: string) => void,
    onSelectedChange: (selected: number) => void,
    selected: number,
    postPublication: (publication: Publication) => void,
    loading: boolean,
    publications: Publication[],
    itemSize: number,
    left: number,
    page: number,
    onPageChange: (page: number) => void,
    categories: CategoryRaw[]
}

const PublicationListView: FunctionComponent<PublicationListViewProps> = (
    {
        handleSearchTerm,
        onSelectedChange,
        selected,
        postPublication,
        itemSize,
        left,
        page,
        publications,
        loading,
        onPageChange,
        categories
    }
) => {
    return (
        <div className="parent-div">
            <PublicationListHeader 
                handleSearchTerm={handleSearchTerm}
                selected={selected}
                onSelectedChange={onSelectedChange}
                postPublication={postPublication}
                categories={categories}
            />

            <PublicationList 
                itemSize={itemSize}
                left={left}
                page={page}
                publications={publications}
                loading={loading}
                onPageChange={onPageChange}
            />
        
        </div>
    )
}

export default PublicationListView