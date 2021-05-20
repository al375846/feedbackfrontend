import React, { FunctionComponent } from 'react'
import { Spinner } from 'react-bootstrap'
import SuggestionCard from '../../../../components/cards/SuggestionCard'
import { Suggestion } from '../../../../entities/Suggestion'



interface SuggestionListProps {
    suggestions: Suggestion[] | undefined,
    handleAccept: (suggestion: Suggestion) => void,
    handleRemove: (suggestion: Suggestion) => void
}

const SuggestionList: FunctionComponent<SuggestionListProps> = (
    {
        suggestions,
        handleAccept,
        handleRemove
    }
) => {

    if ( !suggestions )
        return <div className="loading"><Spinner animation="border"/></div> 

    const rendersuggestions = suggestions.map((suggestion) => {
        return <SuggestionCard 
                    key={suggestion.id}
                    suggestion={suggestion}
                    handleAccept={handleAccept} 
                    handleRemove={handleRemove}/>
    })

    return (
        <div className="suggestion-list">
            {rendersuggestions}
        </div>
    )
}

export default SuggestionList