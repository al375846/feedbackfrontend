import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { History } from '../../../entities/History'
import { User, UserParams } from '../../../entities/User'
import UserProfile from './components/UserProfile'

interface UserViewProps {
    history: History[] | undefined,
    user: User | undefined,
    edit: boolean,
    handleEdit: (edit: boolean) => void,
    onSubmit: (data: UserParams) => void,
    register: UseFormRegister<UserParams>,
    handleSubmit: UseFormHandleSubmit<UserParams>,
    handleChange: (change: boolean) => void,
    handleDelete: (del: boolean) => void,
}

const UserView: FunctionComponent<UserViewProps> = (
    {
        history,
        user,
        edit,
        handleEdit,
        onSubmit,
        register,
        handleSubmit,
        handleChange,
        handleDelete
    }
) => {

    return (
        <UserProfile 
            history={history}
            user={user}
            edit={edit}
            handleEdit={handleEdit}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDelete={handleDelete}/>
    )
}

export default UserView