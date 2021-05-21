import React, { FunctionComponent } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import InputForm from '../../../../components/form/input/InputForm'
import { ChangePasswordInput } from '../UserEditDataContainer'

interface ChangePasswordModalProps {
    alert: boolean,
    showChange: boolean,
    handleChange: (change: boolean) => void,
    changeRegister: UseFormRegister<ChangePasswordInput>,
    changeHandle: UseFormHandleSubmit<ChangePasswordInput>,
    onSubmitChange: (data: ChangePasswordInput) => void,
    passwordMismatches: () => boolean
}

const ChangePasswordModal: FunctionComponent<ChangePasswordModalProps> = (
    {
        alert,
        showChange,
        handleChange,
        changeRegister,
        changeHandle,
        onSubmitChange,
        passwordMismatches
    }
) => {

    if (!showChange) return null

    const ModalDom = (
        <Modal show={showChange} onHide={() => handleChange(false)} 
            backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={changeHandle(onSubmitChange)}>
                <InputForm 
                    name={"change-old-password"}
                    label={"Old Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'oldPassword'}
                    register={changeRegister}
                />
                <InputForm 
                    name={"change-new-password"}
                    label={"New Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'newPassword'}
                    register={changeRegister}
                />
                <InputForm 
                    name={"change-confirm-password"}
                    label={"Confirm New Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'confirmPassword'}
                    register={changeRegister}
                />
                <Alert variant="danger" show={passwordMismatches()} dismissible={false}>
                    Password mismatches
                </Alert>
                <Alert variant="danger" show={alert} dismissible={true}>
                    IncorrectPassword
                </Alert>
                <Button variant="primary" type="submit" 
                    className="profile-submit" disabled={passwordMismatches()}>
                    Submit
                </Button>
                <Button variant="secondary" type="button" 
                    onClick={() => handleChange(false)}>
                    Close
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default ChangePasswordModal