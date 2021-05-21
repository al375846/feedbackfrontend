import React, { FunctionComponent } from 'react'
import SearchBar from '../../../../components/search/SearchBar'
import { CategoryRaw } from '../../../../entities/Category'
import { Publication } from '../../../../entities/Publication'
import CategoryMenu from '../../categories/CategoryMenu'

interface PublicationListHeaderProps {
    handleSearchTerm: (term: string) => void,
    onSelectedChange: (selected: number) => void,
    selected: number,
    categories: CategoryRaw[]

}

const PublicationListHeader: FunctionComponent<PublicationListHeaderProps> = (
    {
        handleSearchTerm,
        onSelectedChange,
        selected,
        categories
    }
) => {
    return (
        <div>
           <SearchBar 
                handleSearchTerm={handleSearchTerm}/>

            <CategoryMenu 
                onSelectedChange={onSelectedChange}
                selected={selected}
                categories={categories}/>
        </div>
    )
}

export default PublicationListHeader