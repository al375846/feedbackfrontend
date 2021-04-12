import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Home
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    Publications list
                </Link>
                <Link to="/login" className="item">
                    Log in
                </Link>
            </div>
        </div>
    )
}

export default Header