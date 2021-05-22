import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { PasswordInput, ChangePasswordInput } from '../../../entities/User'
import ChangePasswordModal from './components/ChangePasswordModal'
import DeleteUserModal from './components/DeleteUserModal'

interface UserEditViewProps {
    alert: boolean,
    showDelete: boolean,
    showChange: boolean,
    handleDelete: (del: boolean) => void,
    handleChange: (change: boolean) => void,
    deleteRegister: UseFormRegister<PasswordInput>,
    deleteHandle: UseFormHandleSubmit<PasswordInput>,
    onSubmitDelete: (data: PasswordInput) => void,
    changeRegister: UseFormRegister<ChangePasswordInput>,
    changeHandle: UseFormHandleSubmit<ChangePasswordInput>,
    onSubmitChange: (data: ChangePasswordInput) => void,
    passwordMismatches: () => boolean
}

const UserEditView: FunctionComponent<UserEditViewProps> = (
    {
        alert,
        showDelete,
        showChange,
        handleDelete,
        handleChange,
        deleteRegister,
        deleteHandle,
        onSubmitDelete,
        changeRegister,
        changeHandle,
        onSubmitChange,
        passwordMismatches
    }
) => {
    return (
        <>
            <DeleteUserModal 
                alert={alert}
                showDelete={showDelete}
                handleDelete={handleDelete}
                deleteRegister={deleteRegister}
                deleteHandle={deleteHandle}
                onSubmitDelete={onSubmitDelete}/>

            <ChangePasswordModal 
                alert={alert}
                showChange={showChange}
                handleChange={handleChange}
                changeRegister={changeRegister}
                changeHandle={changeHandle}
                onSubmitChange={onSubmitChange}
                passwordMismatches={passwordMismatches}/>
        </>
    )
}

export default UserEditView
