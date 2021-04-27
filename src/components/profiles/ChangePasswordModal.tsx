import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'

export interface ChangePasswordModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {

    const [password, setPassword] = useState<string>('')
    const [newpassword, setNewassword] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    if (!props.show) return null

    const doLogin = async () => {
        const {data} = await api.post('/api/login_check', {
            username: credentials.username,
            password: newpassword
        })
        credentials.onTokenChange(data.token)
        localStorage.setItem('token', data.token)
    }

    const handleSubmit = async() => {

        const passdata = {
            password: newpassword
        }

        await api.put('/api/user/change_password', passdata, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        await doLogin()

        props.setShow(false)
        setPassword('')
        setNewassword('')
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="change-password">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="change-newpassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" value={newpassword} onChange={e => setNewassword(e.target.value)}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => handleSubmit()}>
                Submit
            </Button>
            <Button variant="secondary" onClick={() => props.setShow(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)

}

export default ChangePasswordModal