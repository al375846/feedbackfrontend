import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isApprentice, isExpert } from '../../../../contexts/CredentialsContext'

interface LoggedInfoProps {
    onHandleLogout: () => void,
    favs: () => boolean,
    username: string,
    usertype: string
}

const LoggedInfo: FunctionComponent<LoggedInfoProps> = (
    {
        onHandleLogout,
        favs,
        username,
        usertype
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

    const renderLink = () => {
        if (isExpert(usertype) || isApprentice(usertype))
            return '/profile'
        else
            return '/admin'
    }

    return (
        <div className="item">
                {renderFavs()}

                <Link to={renderLink()} className="item">
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