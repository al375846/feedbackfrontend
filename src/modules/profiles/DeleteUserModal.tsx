import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
import { doLogout } from '../auth/login/LoginModal'

export interface DeleteUserModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteUserModal = (props: DeleteUserModalProps) => {

    const [password, setPassword] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    if (!props.show) return null

    const onHandleLogout = async () => {
        doLogout()
        credentials.onTokenChange('')
        credentials.onUsertypeChange('')
        credentials.onUsernameChange('')
    }

    const handleSubmit = async() => {

        await api.delete(`/api/user/${password}`, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        await onHandleLogout()

        props.setShow(false)
        setPassword('')

        const link = document.createElement('a')
        link.href = '/'
        document.body.appendChild(link)
        link.click()
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Para comfirmar el borrado de su cuenta indique su contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="delete-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
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

export default DeleteUserModal