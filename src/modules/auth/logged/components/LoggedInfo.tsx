import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface LoggedInfoProps {
    onHandleLogout: () => void,
    favs: () => boolean,
    username: string
}

const LoggedInfo: FunctionComponent<LoggedInfoProps> = (
    {
        onHandleLogout,
        favs,
        username
    }
) => {

    const renderFavs = () => {
        if (favs())
            return (
                <Link to="/favs" className="item">
                   Favourite Categories
                </Link>
            )
    }

    return (
        <div className="item">
                {renderFavs()}

                <Link to="/profile" className="item">
                    <i className="user icon"></i>
                    {username}
                </Link>

                <Button variant="secondary" onClick={() => onHandleLogout()}>
                    Log out
                </Button>
            </div>  
    )
}

export default LoggedInfo