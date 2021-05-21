import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CredentialsContext from '../../../contexts/CredentialsContext';
import UserContext from '../../../contexts/UserContext';
import { History } from '../../../entities/History';
import { ProfileRepository } from '../repository/ProfileRepository';
import UserView from './UserView';

export type UserParams = {
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

const UserDataContainer = () => {

    const [ history, setHistory ] = useState<History[]>()
    const { register, handleSubmit } = useForm<UserParams>()

    const credentials = useContext(CredentialsContext)
    const userContext = useContext(UserContext)
    const repository = new ProfileRepository()

    useEffect(() => {
        if (!history)
            repository.getHistory(credentials.usertype, credentials.token)
            .then(res => setHistory(res.data.history))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, credentials.usertype, history])

    useEffect(() => {
        if (!userContext.user)
            repository.getUser(credentials.token)
            .then(res => userContext.onUserChange(res.data.user))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, userContext.user])

    const onSubmit = (data: UserParams) => {
        const userData = {
            username: credentials.username,
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone
        }

        repository.putUser(userData, credentials.token)
        .then(() => userContext.handleEdit(false))
        .catch(err => window.alert(err))
            
    }

    return (
        <UserView 
            history={history}
            user={userContext.user}
            edit={userContext.edit}
            handleEdit={userContext.handleEdit}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            handleChange={userContext.handleChange}
            handleDelete={userContext.handleDelete}/>
    )
}

export default UserDataContainer