import React, { useState } from 'react'
import { User } from '../entities/User'

export interface UserData {
    user: User | undefined,
    onUserChange: (user: User) => void
    edit: boolean,
    handleEdit: (bool: boolean) => void,
    del: boolean,
    handleDelete: (bool: boolean) => void,
    change: boolean,
    handleChange: (bool: boolean) => void,
}

const UserContext = React.createContext<UserData>({
    user: undefined,
    onUserChange: () => null,
    edit: false,
    handleEdit: () => null,
    del: false,
    handleDelete: () => null,
    change: false,
    handleChange: () => null,
})

export const CredentialsProvider = UserContext.Provider

export interface UserStoreProps {
    children: JSX.Element[]
}

export const UserStore = (props: UserStoreProps) => {

    const [ edit, setEdit ] = useState<boolean>(false)
    const [ del, setDelete ] = useState<boolean>(false)
    const [ change, setChange ] = useState<boolean>(false)
    const [ user, setUser ] = useState<User>()

    const handleEdit = (bool: boolean) => {
        setEdit(bool)
    }

    const handleDelete = (bool: boolean) => {
        setDelete(bool)
    }

    const handleChange = (bool: boolean) => {
        setChange(bool)
    }

    const onUserChange = (user: User) => {
        setUser(user)
    }

    return (
        <UserContext.Provider 
            value={{
                user: user,
                onUserChange: onUserChange,
                edit: edit,
                handleEdit: handleEdit,
                del: del,
                handleDelete: handleDelete,
                change: change,
                handleChange: handleChange}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext