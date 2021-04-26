import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom"
import { Button, Form, Modal } from 'react-bootstrap'

import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'

export interface IncidenceModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = (props: IncidenceModalProps) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    if (!props.show) return null

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

    const handleLogin = async() => {
        await doLogin()
        await doUsertype()
        credentials.onUsernameChange(username)
        props.setShow(false)
        setUsername('')
        setPassword('')
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
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
                    ¿Aun no esta registrado? Hagalo <a href="/register" className="item" onClick={() => props.setShow(false)}>aqui</a>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default LoginModal