import React, { FunctionComponent, useEffect, useState } from 'react'

interface SearchBarProps {
    handleSearchTerm: (term: string) => void
}

const SearchBar: FunctionComponent<SearchBarProps> = (
    {
        handleSearchTerm
    }
) => {

    const [ searchTerm, setSearchTerm ] = useState<string>('')

    useEffect(() => {
        const time = setTimeout( () => {
            handleSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(time)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    return (
        <div className="ui form">
            <div className="ui fluid icon input">
                <input value={searchTerm} placeholder="Search publications" 
                type="text" className="input" onChange={e => setSearchTerm(e.target.value)}/>  
                <i className="search icon"></i>
            </div>
        </div>
    )
}

export default SearchBar
