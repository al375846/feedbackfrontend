import React from 'react'
import { Link } from 'react-router-dom'
import LoggedScreen from '../../modules/auth/logged/LoggedScreen'
import './Header.scss'

const Header = () => {

    return (
        <div className="header-container">
            <div className="header">
        <div className="ui secondary pointing menu">
            <div className="item">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/ranking" className="item">
                Rankings
            </Link>
            <Link to="/suggestion" className="item">
                Suggestions
            </Link>
            </div>
            <div className="right menu">
                <LoggedScreen />
            </div>
        </div>
        </div>
        </div>
    )
}

export default Header