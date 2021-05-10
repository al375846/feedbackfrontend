import React, { useContext, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import { ProfileRepository } from './repository/ProfileRepository'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/form/input/InputForm'

export interface DeleteUserModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type PasswordInput = {
    password: string
}


const DeleteUserModal = (props: DeleteUserModalProps) => {

    const { register, handleSubmit, reset } = useForm<PasswordInput>();
    const credentials = useContext(CredentialsContext);
    const repository = new ProfileRepository();
    const history = useHistory();
    const [ alert, setAlert ] = useState<boolean>(false);

    if (!props.show) return null

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handleRemove = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('usertype')
        localStorage.removeItem('onesignal')
        credentials.onTokenChange('')
        credentials.onUsertypeChange('')
        credentials.onUsernameChange('')
        history.push('/')
        props.setShow(false)
    }

    const onSubmit = (data: PasswordInput) => {

        const passwordData = {
            password: data.password
        }

        repository.checkPassword(passwordData, credentials.token)
        .then(res => {
            if (res.data.correct)
                repository.deleteUser(credentials.token)
                .then(() => handleRemove())
                .catch(err => window.alert(err))
            else {
                showAlert()
                reset({password: ''})
            }
        })
        .catch(err => window.alert(err))
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Para comfirmar el borrado de su cuenta indique su contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputForm 
                    name={"delete-password"}
                    label={"Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'password'}
                    register={register}
                />
                <Alert variant="danger" show={alert} dismissible={true}>
                    Incorrect Password
                </Alert>
                <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={() => props.setShow(false)}>
                    Close
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)

}

export default DeleteUserModal