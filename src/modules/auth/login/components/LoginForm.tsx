import React, { FunctionComponent } from 'react'
import { Form, Alert, Button, Row, Col } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import InputForm from '../../../../components/form/input/InputForm'
import { LoginInput } from '../../../../entities/User'

interface LoginFormProps {
    alert: boolean,
    handleAlert: (bool: boolean) => void,
    register: UseFormRegister<LoginInput>,
    handleSubmit: UseFormHandleSubmit<LoginInput>,
    onSubmit: (data: LoginInput) => void
}

const LoginForm: FunctionComponent<LoginFormProps> = (
    {
        alert,
        handleAlert,
        register,
        handleSubmit,
        onSubmit
    }
) => {

    return (
        <div>
            <h1>Please Log in or Register</h1>
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
                    onClose={() => handleAlert(false)} 
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