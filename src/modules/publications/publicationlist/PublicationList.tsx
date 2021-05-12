import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'

import { Publication } from '../../../entities/Publication'
import './PublicationTotal.css'
import CredentialsContext from '../../../contexts/CredentialsContext'
import PublicationCreate from './PublicationCreate'
import CategoryMenu from './CategoryMenu'
import PublicationListDetails from './PublicationListDetails'

const PublicationList = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [finalSearchTerm, setFinalSearchTerm] = useState<string>('')
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [selected, setSelected] = useState(-2)

    const history = useHistory();

    const credentials = useContext(CredentialsContext)

    const navigateToPublication = (id: number) => history.push(`/publication/${id}`)

    const onSelectedChange = (selected: number) => setSelected(selected)

    const postPublication = (publication: Publication) => navigateToPublication(publication.id)

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

    useEffect(() => {
        const time = setTimeout( () => {
            setFinalSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }
    }, [searchTerm])

    if (!credentials.token)
        return <div style={{textAlign: 'center'}}><h1>Please Login or Register</h1></div> 

    return (
        <div className="parent-div">
            <div className="ui form">
                <div className={`ui fluid icon input ${credentials.usertype === 'apprentice' ? 'posting' : ''}`}>
                    <input value={searchTerm} placeholder="Search publications" 
                    type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                    <i className="search icon"></i>
                </div>
                {renderPost()}
            </div>
            <CategoryMenu 
                onSelectedChange={onSelectedChange}
                selected={selected}/>

            <PublicationListDetails 
                finalSearchTerm={finalSearchTerm}
                selected={selected}/>
           
            <PublicationCreate visible={showCreate} setShowCreate={setShowCreate} postPublication={postPublication}/>
        </div>
    )
}

export default PublicationList