import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'

const Header = () => {

    const credentials = useContext(CredentialsContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    let token = ''

    const doLogin = async () => {
        const {data} = await api.post('/api/login_check', {
            username: username,
            password: password
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
        setShow(false)
    }

    const onHandleLogout = async () => {
        credentials.onTokenChange('')
        credentials.onUsertypeChange('')
        setUsername('')
        setPassword('')
    }

    const handleClose = () => {
        setShow(false)
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
                    <Link to="/" className="item">
                    <i className="user icon"></i>
                    {username}
                    </Link>
                    <Button variant="secondary" onClick={() => onHandleLogout()}>
                    Log out
                    </Button>
                </div>  
            )
    }

    const renderAdminOptions = () => {
        if (credentials.usertype === 'admin')
            return (
                <div className="item">
                    <Link to="/" className="item">
                        Admin panel
                    </Link>
                </div>
            )
        return null
    }

    return (
        <div className="ui secondary pointing menu">
            <div className="item">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/feedback" className="item">
                Feedbacks
            </Link>
            </div>
            <div className="right menu">
                {renderAdminOptions()}
                {renderLogin()}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="title">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onHandleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Header