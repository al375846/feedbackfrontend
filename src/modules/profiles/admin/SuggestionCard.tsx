import React from "react"
import { Button, Card } from "react-bootstrap"

import { Suggestion } from "../../../entities/Suggestion"

interface SuggestionCardProps {
    suggestion: Suggestion,
    handleAccept: (suggestion: Suggestion) => void,
    handleRemove: (suggestion: Suggestion) => void
}

const SuggestionCard = (props: SuggestionCardProps) => {

    const renderbuttons = (suggestion: Suggestion) => {
        if (suggestion.type === 'category')
            return (
                <Card.Footer>
                    <div className="suggestion-left">
                        <Button onClick={() => props.handleAccept(suggestion)}>
                            Accept
                        </Button>
                    </div>
                    <div className="suggestion-right">
                        <Button onClick={() => props.handleRemove(suggestion)}>
                            Decline
                        </Button>
                    </div>
                </Card.Footer>
            )
    }

    const rendertype = (suggestion: Suggestion) => {
        if (suggestion.type === 'category')
            return suggestion.parent ? `Subcategoria: ${suggestion.parent.name}` : 'Categoría principal'
        else
            return 'Mejora'
    }

    return (
        <Card>
            <Card.Header>
            <div className="suggestion-left">
                {props.suggestion.name}
            </div>
            <div className="suggestion-right">
                {rendertype(props.suggestion)}
            </div>
            </Card.Header>
            <Card.Body>
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text">{props.suggestion.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            {renderbuttons(props.suggestion)}
        </Card>
    )

    
}

export default SuggestionCard