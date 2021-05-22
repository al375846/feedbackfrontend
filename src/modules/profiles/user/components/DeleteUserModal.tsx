import React, { FunctionComponent } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import InputForm from '../../../../components/form/input/InputForm'
import { PasswordInput } from '../../../../entities/User'

interface DeleteUserModalProps {
    alert: boolean,
    showDelete: boolean,
    handleDelete: (bool: boolean) => void,
    deleteRegister: UseFormRegister<PasswordInput>,
    deleteHandle: UseFormHandleSubmit<PasswordInput>,
    onSubmitDelete: (data: PasswordInput) => void
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = (
    {
        alert,
        showDelete,
        handleDelete,
        deleteRegister,
        deleteHandle,
        onSubmitDelete,
    }
) => {

    if (!showDelete) return null

    const ModalDom = (
        <Modal show={showDelete} onHide={() => handleDelete(false)} 
            backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Para comfirmar el borrado de su cuenta indique su contraseña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={deleteHandle(onSubmitDelete)}>
                <InputForm 
                    name={"delete-password"}
                    label={"Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'password'}
                    register={deleteRegister}
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