import React, { FunctionComponent, useContext, useState } from 'react'
import { Form, Alert, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputForm from '../../../components/form/input/InputForm';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { AuthRepository } from '../repository/AuthRepository';

interface LoginFormProps {

}

type LoginInput = {
    username: string,
    password: string
};

const LoginForm: FunctionComponent<LoginFormProps> = () => {

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

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row >
                    <Col sm={12} md={12} lg={12}>
                    <InputForm 
                        name={"login-username"}
                        label={"Username"}
                        value={""}
                        type={"text"}
                        required={true}
                        input={'username'}
                        register={register}/>
                    </Col>
                </Row>
                <Row >
                    <Col sm={12} md={12} lg={12}>
                    <InputForm 
                        name={"login-password"}
                        label={"Password"}
                        value={""}
                        type={"password"}
                        required={true}
                        input={'password'}
                        register={register}/>
                    </Col>
                </Row>
                <Alert variant="danger" show={alert} 
                    onClose={() => setAlert(false)} 
                    dismissible={true}>
                    Usuario o contraseña incorrectos
                </Alert>

                Not registered? Do it 
                <a href="/register" className="item"> here</a>
                
                <Button variant="primary" type="submit" className="login-button">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
