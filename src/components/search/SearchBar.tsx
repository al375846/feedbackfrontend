import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CredentialsContext from '../../contexts/CredentialsContext'

interface SearchBarProps {
    handleSearchTerm: (term: string) => void,
    handleShow: (show: boolean) => void,
    show: boolean
}

const SearchBar: FunctionComponent<SearchBarProps> = (
    {
        handleSearchTerm,
        handleShow,
        show
    }
) => {

    const [ searchTerm, setSearchTerm ] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const time = setTimeout( () => {
            handleSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    const renderPost = () => {
        if (credentials.usertype === 'apprentice')
            return (
                <div className="add-publication">
                    <Button onClick={() => handleShow(!show)}>
                        Post your publication
                    </Button>  
                </div>
            )
    }

    return (
        <div className="ui form">
            <div className={`ui fluid icon input ${credentials.usertype === 'apprentice' ? 'posting' : ''}`}>
                <input value={searchTerm} placeholder="Search publications" 
                type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                <i className="search icon"></i>
            </div>
            {renderPost()}
        </div>
    )
}

export default SearchBar
