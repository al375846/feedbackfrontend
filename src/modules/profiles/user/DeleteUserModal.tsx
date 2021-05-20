import React, { FunctionComponent, useContext, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import CredentialsContext from '../../../contexts/CredentialsContext'
import InputForm from '../../../components/form/input/InputForm'
import { ProfileRepository } from '../repository/ProfileRepository'

export interface DeleteUserModalProps {
    show: boolean,
    handleDelete: (bool: boolean) => void
}

type PasswordInput = {
    password: string
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = (
    {
        show,
        handleDelete
    }
) => {

    const { register, handleSubmit, reset } = useForm<PasswordInput>();
    const credentials = useContext(CredentialsContext);
    const repository = new ProfileRepository();
    const history = useHistory();
    const [ alert, setAlert ] = useState<boolean>(false);

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
        handleDelete(false)
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

    if (!show) return null

    const ModalDom = (
        <Modal show={show} onHide={() => handleDelete(false)} 
            backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Para comfirmar el borrado de su cuenta indique su contraseña
                </Modal.Title>
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
                <Button variant="primary" type="submit" className="profile-submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={() => handleDelete(false)}>
                    Close
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )

    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default DeleteUserModal