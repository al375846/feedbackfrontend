import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { AuthRepository } from '../repository/AuthRepository';
import LoginView from './LoginView';

export type LoginInput = {
    username: string,
    password: string
}

const LoginDataContainer = () => {

    const { register, handleSubmit, reset } = useForm<LoginInput>()
    const [ alert, setAlert ] = useState<boolean>(false)

    const credentials = useContext(CredentialsContext)
    const repository = new AuthRepository()
    const history = useHistory()

    const navigateToHome = () => history.push('/')

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
            navigateToHome()
        })
    }

    const handleVisible = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handleAlert = (bool: boolean) => setAlert(bool)

    return (
        <LoginView 
            alert={alert}
            handleAlert={handleAlert}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}/>
    )
}

export default LoginDataContainer