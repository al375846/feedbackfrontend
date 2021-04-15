import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'

const Header = () => {

    const credentials = useContext(CredentialsContext)
    let token = ''

    const doLogin = async () => {
        const {data} = await api.post('/api/login_check', {
            username: 'carlosmo',
            password: 'carlosmo'
        })
        credentials.onTokenChange(data.token)
        token = data.token
    }

    const doUsertype = async () => {
        const {data} = await api.get('/api/usertype', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        credentials.onUsertypeChange(data.usertype)
    }

    const onHandleLogin = async () => {
        await doLogin()
        await doUsertype()
    }

    const renderLogin = () => {
        if (!credentials.token)
            return (
                <div>
                    <Button variant="primary" onClick={() => onHandleLogin()}>
                    Log in
                    </Button>
                </div>
            )
        else
            return (
                <div className="item">
                    carlosmo
                </div>
            )
    }

    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/feedback" className="item">
                Feedbacks
            </Link>
            <div className="right menu">
                {renderLogin()}
            </div>
        </div>
    )
}

export default Header