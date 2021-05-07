import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom"
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import api from '../../../api/Api'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { AuthRepository } from '../repository/AuthRepository'
import { useForm } from 'react-hook-form'
import InputForm from '../../../components/form/input/InputForm'

export interface IncidenceModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type LoginInput = {
    username: string,
    password: string
}

const LoginModal = (props: IncidenceModalProps) => {

    const { register, handleSubmit } = useForm<LoginInput>();
    const [alert, setAlert] = useState<boolean>(false)
    const credentials = useContext(CredentialsContext)

    const repository = new AuthRepository();

    const onSubmit = async (data: LoginInput) => {
        
        repository.login(data.username, data.password)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', data.password)
            credentials.onTokenChange(res.data.token)
            credentials.onUsernameChange(data.password)
            repository.usertype(res.data.token)
            .then(res => {
                localStorage.setItem('usertype', res.data.usertype)
                credentials.onUsertypeChange(res.data.usertype)
                props.setShow(false)
            })
            .catch(err => window.alert(err))
        })
        .catch(() => handleVisible())
        .finally(() => {
            //@ts-ignore
            OneSignal.getUserId()
            .then((data:any) => {
                localStorage.setItem('onesignal', data)
                const logdata = {
                    onesignal: data
                }
                repository.onesignal(logdata, localStorage.getItem('token')!)
            })
        })
    }

    const handleVisible = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    if (!props.show) return null

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm 
                        name={"login-username"}
                        label={"Username"}
                        value={""}
                        type={"text"}
                        required={true}
                        input={'username'}
                        register={register}
                    />

                    <InputForm 
                        name={"login-password"}
                        label={"Password"}
                        value={""}
                        type={"password"}
                        required={true}
                        input={'password'}
                        register={register}
                    />

                    <Alert variant="danger" show={alert} onClose={() => setAlert(false)} dismissible={true}>
                        Usuario o contraseña incorrectos
                    </Alert>
                    ¿Aun no esta registrado? Hagalo <a href="/register" className="item" onClick={() => props.setShow(false)}>aqui</a>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default LoginModal