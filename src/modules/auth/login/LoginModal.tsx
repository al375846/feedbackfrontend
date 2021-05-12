import React, { FunctionComponent, useContext, useState } from 'react';
import { createPortal } from "react-dom";
import { Alert, Button, Form, Modal } from 'react-bootstrap';

import CredentialsContext from '../../../contexts/CredentialsContext';
import { AuthRepository } from '../repository/AuthRepository';
import { useForm } from 'react-hook-form';
import InputForm from '../../../components/form/input/InputForm';
import './Login.css'

export interface IncidenceModalProps {
    show: boolean,
    onShowChange: (show: boolean) => void
};

type LoginInput = {
    username: string,
    password: string
};

const LoginModal: FunctionComponent<IncidenceModalProps> = (
    {
        show,
        onShowChange
    }
) => {

    const { register, handleSubmit, reset } = useForm<LoginInput>();
    const [ alert, setAlert ] = useState<boolean>(false);
    const credentials = useContext(CredentialsContext);
    const repository = new AuthRepository();

    const onSubmit = (data: LoginInput) => {
        
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
                onShowChange(false)
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
            reset({ username: '', password: ''})
        })
    }

    const handleVisible = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    if (!show) return null

    const ModalDom = (
        <Modal show={show} onHide={() => onShowChange(false)}>
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

                    <Alert variant="danger" show={alert} 
                        onClose={() => setAlert(false)} 
                        dismissible={true}>
                        Usuario o contraseña incorrectos
                    </Alert>

                    Not registered? Do it 
                    <a href="/register" className="item" 
                        onClick={() => onShowChange(false)}> here</a>

                    <Button variant="secondary" 
                        onClick={() => onShowChange(false)} className="close-button">
                        Close
                    </Button>
                    
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default LoginModal