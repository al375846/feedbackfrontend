import React, { FunctionComponent, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import InputForm from '../../../components/form/input/InputForm';
import InputRadio from '../../../components/form/radio/InputRadio';
import { AuthRepository } from '../repository/AuthRepository';
import './Register.css';

type RegsiterInput = {
    username: string,
    password: string,
    confirmpassword: string,
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string,
    type: string  
};

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {

    const { register, handleSubmit, watch } = useForm<RegsiterInput>();
    const [ alert, setAlert ] = useState<boolean>(false);
    const repository = new AuthRepository();
    const history = useHistory();
    const password = watch('password');
    const confirmpassword = watch('confirmpassword');

    const radioValues = [
        {
            id: "apprentice",
            label: "Apprentice",
            value: "apprentice"
        },
        {
            id: "expert",
            label: "Expert",
            value: "expert"
        }
    ];

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    };

    const navigateToHome = () => history.push('/');

    const onSubmit = (data: RegsiterInput) => {

        const registerData = {
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone
        };

        repository.checkUsername(data.username)
        .then(res => {
            if (!res.data.exists)
                repository.register(registerData, data.type)
                .then()
                .catch()
                .finally(() => navigateToHome())
            else
                showAlert()
        })
        .catch(err => window.alert(err));
        
    };
    
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
                        <Alert variant="danger" show={password !== confirmpassword} 
                            dismissible={false}>
                            Password mismatches
                        </Alert>
                        <Alert variant="danger" show={alert} dismissible={true} 
                            onClose={() => setAlert(false)}>
                            Username already taken
                        </Alert>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" 
                    className="profile-submit" disabled={password !== confirmpassword}>
                Submit
                </Button>
            </Form>
            </div>
        </div>
    );
};

export default Register