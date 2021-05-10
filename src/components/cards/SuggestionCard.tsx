import React, { FunctionComponent } from "react"
import { Button, Card } from "react-bootstrap"

import { Suggestion } from "../../entities/Suggestion"

interface SuggestionCardProps {
    suggestion: Suggestion,
    handleAccept: (suggestion: Suggestion) => void,
    handleRemove: (suggestion: Suggestion) => void
}

const SuggestionCard: FunctionComponent<SuggestionCardProps> = (
    {
        suggestion,
        handleAccept,
        handleRemove
    }
) => {

    const renderbuttons = () => {
        if (suggestion.type === 'category')
            return (
                <Card.Footer>
                    <div className="suggestion-left">
                        <Button onClick={() => handleAccept(suggestion)}>
                            Accept
                        </Button>
                    </div>
                    <div className="suggestion-right">
                        <Button onClick={() => handleRemove(suggestion)}>
                            Decline
                        </Button>
                    </div>
                </Card.Footer>
            )
    }

    const rendertype = () => {
        if (suggestion.type === 'category')
            return suggestion.parent 
                ? suggestion.parent.name
                : 'Categoría principal'
        else
            return 'Mejora'
    }

    return (
        <Card>
            <Card.Header>
            <div className="suggestion-left">
                {suggestion.name}
            </div>
            <div className="suggestion-right">
                {rendertype()}
            </div>
            </Card.Header>
            <Card.Body>
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text">{suggestion.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            {renderbuttons()}
        </Card>
    )

    
}

export default SuggestionCard