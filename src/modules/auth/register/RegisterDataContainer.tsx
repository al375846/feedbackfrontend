import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { RegsiterInput } from '../../../entities/User';
import { AuthRepository } from '../repository/AuthRepository';
import RegisterView from './RegisterView';

const RegisterDataContainer = () => {

    const { register, handleSubmit, watch } = useForm<RegsiterInput>()
    const [ alert, setAlert ] = useState<boolean>(false)
    const history = useHistory()
    const password = watch('password')
    const confirmpassword = watch('confirmpassword')

    const repository = new AuthRepository()

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    };

    const navigateToHome = () => history.push('/')

    const passwordMismatches = () => password !== confirmpassword

    const handleAlert = (alert: boolean) => setAlert(alert)

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
        .catch(err => window.alert(err))

    }

    return (
        <RegisterView 
            alert={alert}
            handleAlert={handleAlert}
            passwordMismatches={passwordMismatches}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}/>
    )
}

export default RegisterDataContainer