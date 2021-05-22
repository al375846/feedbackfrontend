import React, { FunctionComponent } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import InputForm from '../../../../components/form/input/InputForm'
import InputRadio from '../../../../components/form/radio/InputRadio'
import { CredentialsUsertype } from '../../../../contexts/CredentialsContext'
import { RegsiterInput } from '../../../../entities/User'
import './Register.css'

interface RegisterProps {
    alert: boolean,
    handleAlert: (alert: boolean) => void,
    passwordMismatches: () => boolean,
    register: UseFormRegister<RegsiterInput>, 
    handleSubmit: UseFormHandleSubmit<RegsiterInput>,
    onSubmit: (data: RegsiterInput) => void
}

const Register: FunctionComponent<RegisterProps> = (
    {
        alert,
        handleAlert,
        passwordMismatches,
        register, 
        handleSubmit,
        onSubmit
    }
) => {

    const radioValues = [
        {
            id: "apprentice",
            label: "Apprentice",
            value: CredentialsUsertype.APPRENTICE
        },
        {
            id: "expert",
            label: "Expert",
            value: CredentialsUsertype.EXPERT
        }
    ]
    
    return(
        <div>
            <div className="register-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <InputForm 
                            name={"register-name"}
                            label={"Name"}
                            value={""}
                            type={"text"}
                            required={true}
                            input={'name'}
                            register={register}/>
                    </Col>
                    <Col>
                        <InputForm 
                            name={"register-lastname"}
                            label={"Lastame"}
                            value={""}
                            type={"text"}
                            required={true}
                            input={'lastname'}
                            register={register}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputForm 
                            name={"register-username"}
                            label={"Username"}
                            value={""}
                            type={"text"}
                            required={true}
                            input={'username'}
                            register={register}/>
                    </Col>
                    <Col>
                        <InputForm 
                            name={"register-email"}
                            label={"Email"}
                            value={""}
                            type={"email"}
                            required={true}
                            input={'email'}
                            register={register}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputForm 
                            name={"register-address"}
                            label={"Address"}
                            value={""}
                            type={"text"}
                            required={true}
                            input={'address'}
                            register={register}/>
                    </Col>
                    <Col>
                        <InputForm 
                            name={"register-phone"}
                            label={"Phone"}
                            value={""}
                            type={"text"}
                            required={true}
                            input={'phone'}
                            register={register}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputForm 
                            name={"register-password"}
                            label={"Password"}
                            value={""}
                            type={"password"}
                            required={true}
                            input={'password'}
                            register={register}/>
                    </Col>
                    <Col>
                    <InputForm 
                        name={"register-confirm"}
                        label={"Confirm password"}
                        value={""}
                        type={"password"}
                        required={true}
                        input={'confirmpassword'}
                        register={register}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputRadio 
                            options={radioValues}
                            input={'type'}
                            register={register}/>
                    </Col>
                    <Col>
                        <Alert variant="danger" show={passwordMismatches()} 
                            dismissible={false}>
                            Password mismatches
                        </Alert>
                        <Alert variant="danger" show={alert} dismissible={true} 
                            onClose={() => handleAlert(false)}>
                            Username already taken
                        </Alert>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" 
                    className="profile-submit" disabled={passwordMismatches()}>
                Submit
                </Button>
            </Form>
            </div>
        </div>
    )
}

export default Register