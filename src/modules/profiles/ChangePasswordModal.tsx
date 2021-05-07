import React, { FormEvent, useContext, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
//import { doLogin } from '../auth/login/LoginModal'

export interface ChangePasswordModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {

    const [password, setPassword] = useState<string>('')
    const [newpassword, setNewpassword] = useState<string>('')
    const [confirmpassword, setConfirmpassword] = useState<string>('')
    const credentials = useContext(CredentialsContext)
    const [alert, setAlert] = useState<boolean>(false)

    if (!props.show) return null

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (newpassword === confirmpassword) {
            const passdata = {
                oldPassword: password,
                newPassword: newpassword
            }
    
            api.put('/api/user/change_password', passdata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            }).then(() => {
                /*doLogin(credentials.username, newpassword)
                .then(() => {
                    credentials.onTokenChange(localStorage.getItem('token')!)
                })
                props.setShow(false)
                setPassword('')
                setNewpassword('')*/
            }).catch(() => {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000)
            })
        }
        else {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        }
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="change-password">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required={true}/>
                </Form.Group>
                <Form.Group controlId="change-newpassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" value={newpassword} onChange={e => setNewpassword(e.target.value)} required={true}/>
                </Form.Group>
                <Form.Group controlId="change-confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmpassword} onChange={e => setConfirmpassword(e.target.value)} required={true}/>
                </Form.Group>
                <Alert variant="danger" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                    Alguna contraseña no es correcta
                </Alert>
                <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                    Submit
                </Button>
                <Button variant="secondary" type="button" onClick={() => props.setShow(false)}>
                    Close
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)

}

export default ChangePasswordModal