import React, { FunctionComponent } from 'react'
import SearchBar from '../../../../components/search/SearchBar'
import { CategoryRaw } from '../../../../entities/Category'
import { Publication } from '../../../../entities/Publication'
import CategoryMenu from '../../categories/CategoryMenu'
import PublicationCreate from './PublicationCreate'

interface PublicationListHeaderProps {
    handleShow: (bool: boolean) => void,
    handleSearchTerm: (term: string) => void,
    showCreate: boolean,
    onSelectedChange: (selected: number) => void,
    selected: number,
    postPublication: (publication: Publication) => void,
    categories: CategoryRaw[]

}

const PublicationListHeader: FunctionComponent<PublicationListHeaderProps> = (
    {
        handleShow,
        handleSearchTerm,
        showCreate,
        onSelectedChange,
        selected,
        postPublication,
        categories
    }
) => {
    return (
        <div>
           <SearchBar 
                handleSearchTerm={handleSearchTerm}
                handleShow={handleShow}
                show={showCreate}/>

            <CategoryMenu 
                onSelectedChange={onSelectedChange}
                selected={selected}
                categories={categories}/>
           
            <PublicationCreate 
                visible={showCreate}
                handleShow={handleShow}
                postPublication={postPublication}/>
        </div>
    )
}

export default PublicationListHeader