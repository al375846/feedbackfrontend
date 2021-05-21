import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import CredentialsContext from '../../../contexts/CredentialsContext';
import UserContext from '../../../contexts/UserContext';
import { ProfileRepository } from '../repository/ProfileRepository';
import UserEditView from './UserEditView';

export type PasswordInput = {
    password: string
}

export type ChangePasswordInput = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

const UserEditDataContainer = () => {

    const { register: deleteRegister, handleSubmit: deleteHandle, reset: deleteReset } = useForm<PasswordInput>()
    const [ alert, setAlert ] = useState<boolean>(false)
    const { register: changeRegister, handleSubmit: changeHandle, watch, reset: changeReset } = useForm<ChangePasswordInput>()
    const password = watch('newPassword')
    const confirmpassword = watch('confirmPassword')

    const credentials = useContext(CredentialsContext)
    const repository = new ProfileRepository()
    const history = useHistory()
    const userContext = useContext(UserContext)

    const passwordMismatches = () => password !== confirmpassword

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const onSubmitChange = (data: ChangePasswordInput) => {
        const changeData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }

        repository.changePassword(changeData, credentials.token)
        .then(() => changeReset({oldPassword:'', newPassword:'', confirmPassword:''}))
        .catch(() => showAlert())
    }

    const navigateToHome = () => history.push('/')

    const handleRemove = () => {
        localStorage.removeItem('onesignal')
        credentials.removeAll()
        navigateToHome()
        userContext.handleDelete(false)
    }

    const onSubmitDelete = (data: PasswordInput) => {

        const passwordData = {
            password: data.password
        }

        repository.checkPassword(passwordData, credentials.token)
        .then(res => {
            if (res.data.correct)
                repository.deleteUser(credentials.token)
                .then(() => handleRemove())
                .catch(err => window.alert(err))
            else {
                showAlert()
                deleteReset({password: ''})
            }
        })
        .catch(err => window.alert(err))
    }

    return (
        <UserEditView 
            alert={alert}
            showDelete={userContext.del}
            showChange={userContext.change}
            handleDelete={userContext.handleDelete}
            handleChange={userContext.handleChange}
            deleteRegister={deleteRegister}
            deleteHandle={deleteHandle}
            onSubmitDelete={onSubmitDelete}
            changeRegister={changeRegister}
            changeHandle={changeHandle}
            onSubmitChange={onSubmitChange}
            passwordMismatches={passwordMismatches}/>
    )
}

export default UserEditDataContainer