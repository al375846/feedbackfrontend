import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom"
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'

export interface IncidenceModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const doLogin = async (username: string, password: string) => {
    await api.post('/api/login_check', {
        username: username,
        password: password
    })
    .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
    })
}

export const doUsertype = async () => {
    await api.get('/api/usertype', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        localStorage.setItem('usertype', response.data.usertype)
    })
}

export const doLogout = async () => {
    const logdata = {
        onesignal: localStorage.getItem('onesignal')
    }
    await api.post('/api/logout', logdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('usertype')
        localStorage.removeItem('onesignal')
    })
   
}

export const doOneSignalLogin = async () => {

    //@ts-ignore
    await OneSignal.push(async function() {
        //@ts-ignore
        await OneSignal.getUserId(async function(userId: string) {
            localStorage.setItem('onesignal', userId)
            const logdata = {
                onesignal: userId
            }
        
            await api.post('api/notification', logdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        })
    })
}

const LoginModal = (props: IncidenceModalProps) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const credentials = useContext(CredentialsContext)

    if (!props.show) return null

    const handleLogin = async() => {
        await doLogin(username, password)
        .then(() => {
            credentials.onTokenChange(localStorage.getItem('token')!)
            credentials.onUsernameChange(username)
        })
        .catch(() => handleVisible())
        
        await doUsertype().then(() => {
            credentials.onUsertypeChange(localStorage.getItem('usertype')!)
            props.setShow(false)
            setUsername('')
            setPassword('')
        }).catch(() => {})

        await doOneSignalLogin()
    }

    const handleVisible = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
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
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Alert variant="danger" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                    Usuario o contraseña incorrectos
                </Alert>
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