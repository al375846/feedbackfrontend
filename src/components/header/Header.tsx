import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import LoginModal, { doLogout } from '../login/LoginModal'

const Header = () => {

    const credentials = useContext(CredentialsContext)
    const [show, setShow] = useState<boolean>(false)

    const onHandleLogout = async () => {
        doLogout()
        credentials.onTokenChange('')
        credentials.onUsertypeChange('')
        credentials.onUsernameChange('')
    }

    const renderLogin = () => {
        if (!credentials.token)
            return (
                <div className="item">
                    <Button variant="primary" onClick={() => setShow(true)}>
                    Log in
                    </Button>
                </div>
            )
        else
            return (
                <div className="item">
                    <Link to={`/profile/${credentials.usertype}`} className="item">
                    <i className="user icon"></i>
                    {credentials.username}
                    </Link>
                    <Button variant="secondary" onClick={() => onHandleLogout()}>
                    Log out
                    </Button>
                </div>  
            )
    }

    return (
        <div className="ui secondary pointing menu">
            <div className="item">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/ranking" className="item">
                Rankings
            </Link>
            </div>
            <div className="right menu">
                {renderLogin()}
            </div>
            <LoginModal show={show} setShow={setShow}/>
        </div>
    )
}

export default Header