import React, { useState, useContext, FunctionComponent } from 'react'
import { useHistory } from 'react-router'

import { Publication } from '../../../entities/Publication'
import './PublicationTotal.css'
import CredentialsContext from '../../../contexts/CredentialsContext'
import PublicationCreate from './PublicationCreate'
import CategoryMenu from './CategoryMenu'
import PublicationListDetails from './PublicationListDetails'
import SearchBar from '../../../components/search/SearchBar'
import LoginForm from '../../auth/login/LoginForm'

interface PublicationListProps {

}

const PublicationList: FunctionComponent<PublicationListProps> = () => {

    const [ finalSearchTerm, setFinalSearchTerm ] = useState<string>('')
    const [ showCreate, setShowCreate ] = useState<boolean>(false)
    const [ selected, setSelected ] = useState(-2)
    const history = useHistory();
    const credentials = useContext(CredentialsContext)

    const navigateToPublication = (id: number) => history.push(`/publication/${id}`)

    const onSelectedChange = (selected: number) => setSelected(selected)

    const handleShow = (show: boolean) => setShowCreate(show);

    const postPublication = (publication: Publication) => navigateToPublication(publication.id)

    const handleSearchTerm = (term: string) => setFinalSearchTerm(term)

    if (!credentials.token)
        return (
            <div style={{textAlign: 'center'}}>
                <h1>
                    Please Login or Register
                </h1>   
                <LoginForm />
            </div>
        )

    return (
        <div className="parent-div">
            <SearchBar 
                handleSearchTerm={handleSearchTerm}
                handleShow={handleShow}
                show={showCreate}/>

            <CategoryMenu 
                onSelectedChange={onSelectedChange}
                selected={selected}/>

            <PublicationListDetails 
                finalSearchTerm={finalSearchTerm}
                selected={selected}/>
           
            <PublicationCreate 
                visible={showCreate}
                handleShow={handleShow}
                postPublication={postPublication}/>
        </div>
    )
}

export default PublicationList