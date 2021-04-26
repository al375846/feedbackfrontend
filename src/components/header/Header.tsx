import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'

const Header = () => {

    const credentials = useContext(CredentialsContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        const tokenstored = localStorage.getItem('token')
        if (tokenstored && !credentials.token) {
            credentials.onTokenChange(tokenstored)
            setUsername(localStorage.getItem('username')!)
            credentials.onUsertypeChange(localStorage.getItem('usertype')!)
            credentials.onUsernameChange(localStorage.getItem('username')!)
        }
            
    }, [credentials])

    const doLogin = async () => {
        const {data} = await api.post('/api/login_check', {
            username: username,
            password: password
        })
        credentials.onTokenChange(data.token)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', username)
    }

    const doUsertype = async () => {
        const {data} = await api.get('/api/usertype', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        credentials.onUsertypeChange(data.usertype)
        localStorage.setItem('usertype', data.usertype)
    }

    const onHandleLogin = async () => {
        await doLogin()
        await doUsertype()
        credentials.onUsernameChange(username)
        setShow(false)
    }

    const onHandleLogout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('usertype')
        credentials.onTokenChange('')
        credentials.onUsertypeChange('')
        credentials.onUsernameChange('')
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
                    <Link to={`/profile/${credentials.usertype}`} className="item">
                    <i className="user icon"></i>
                    {username}
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
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