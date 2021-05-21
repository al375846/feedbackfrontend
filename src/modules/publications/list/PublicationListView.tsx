import React, { FunctionComponent } from 'react'
import { CategoryRaw } from '../../../entities/Category'

import { Publication } from '../../../entities/Publication'
import PublicationList from './components/PublicationList'
import PublicationListHeader from './components/PublicationListHeader'

interface PublicationListViewProps {
    handleSearchTerm: (term: string) => void,
    onSelectedChange: (selected: number) => void,
    selected: number,
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