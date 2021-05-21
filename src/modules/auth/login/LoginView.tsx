import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { LoginInput } from './LoginDataContainer'
import LoginForm from './components/LoginForm'

interface LoginViewProps {
    alert: boolean,
    handleAlert: (bool: boolean) => void,
    register: UseFormRegister<LoginInput>,
    handleSubmit: UseFormHandleSubmit<LoginInput>,
    onSubmit: (data: LoginInput) => void
}

const LoginView: FunctionComponent<LoginViewProps> = (
    {
        alert,
        handleAlert,
        register,
        handleSubmit,
        onSubmit
    }
) => {
    return (
        <LoginForm 
            alert={alert}
            handleAlert={handleAlert}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}/>
    )
}

export default LoginView
