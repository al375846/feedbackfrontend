import React, { useContext, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'

import CredentialsContext from '../../contexts/CredentialsContext'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/form/input/InputForm'
import { ProfileRepository } from './repository/ProfileRepository'

export interface ChangePasswordModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type ChangePasswordInput = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {

    const credentials = useContext(CredentialsContext);
    const [ alert, setAlert ] = useState<boolean>(false);
    const { register, handleSubmit, watch, reset } = useForm<ChangePasswordInput>();
    const password = watch('newPassword');
    const confirmpassword = watch('confirmPassword');
    const repository = new ProfileRepository();

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const onSubmit = (data: ChangePasswordInput) => {
        const changeData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }

        repository.changePassword(changeData, credentials.token)
        .then(() => reset({oldPassword:'', newPassword:'', confirmPassword:''}))
        .catch(() => showAlert())
        
    }

    if (!props.show) return null

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputForm 
                    name={"change-old-password"}
                    label={"Old Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'oldPassword'}
                    register={register}
                />
                <InputForm 
                    name={"change-new-password"}
                    label={"New Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'newPassword'}
                    register={register}
                />
                <InputForm 
                    name={"change-confirm-password"}
                    label={"Confirm New Password"}
                    value={""}
                    type={"password"}
                    required={true}
                    input={'confirmPassword'}
                    register={register}
                />
                <Alert variant="danger" show={password !== confirmpassword} dismissible={false}>
                    Password mismatches
                </Alert>
                <Alert variant="danger" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                    IncorrectPassword
                </Alert>
                <Button variant="primary" type="submit" style={{marginRight: '1em'}} disabled={password !== confirmpassword}>
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