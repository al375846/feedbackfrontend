import React, { useState } from 'react'

export interface CredentialsData {
    token: string,
    usertype: string,
    username: string,
    onTokenChange: (token: string) => void,
    onUsertypeChange: (usertype: string) => void,
    onUsernameChange: (username: string) => void,
    removeAll: () => void
}

export enum CredentialsUsertype {
    ADMIN = 'admin',
    APPRENTICE = 'apprentice',
    EXPERT = 'expert'
}

const CredentialsContext = React.createContext<CredentialsData>({
    token: '', usertype: 'apprentice', username: '',
    onTokenChange: () => null, onUsertypeChange: () => null, onUsernameChange: () => null, removeAll: () => null
})

export const isExpert = (type: string): boolean => {
    return type === CredentialsUsertype.EXPERT
}

export const isApprentice = (type: string): boolean => {
    return type === CredentialsUsertype.APPRENTICE
}

export const CredentialsProvider = CredentialsContext.Provider

export interface CredentialsStoreProps {
    children: JSX.Element
}

export const CredentialsStore = (props: CredentialsStoreProps) => {

    const tokenstored = localStorage.getItem('token')
    const typestored = localStorage.getItem('usertype')
    const namestored = localStorage.getItem('username')

    const [token, setToken] = useState<string>(tokenstored ? tokenstored : '')
    const [usertype, setUsertype] = useState<string>(typestored ? typestored : 'apprentice')
    const [username, setUsername] = useState<string>(namestored ? namestored : '')

    const onTokenChange = (token: string) => {
        setToken(token)
    }

    const onUsertypeChange = (usertype: string) => {
        setUsertype(usertype)
    }

    const onUsernameChange = (username: string) => {
        setUsername(username)
    }

    const removeAll = () => {
        setToken('')
        setUsertype('')
        setUsername('')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('usertype')
    }

    return (
        <CredentialsContext.Provider value={{
            token: token, usertype: usertype, username: username,
            onTokenChange: onTokenChange, onUsertypeChange: onUsertypeChange, onUsernameChange: onUsernameChange, removeAll: removeAll
        }}>
            {props.children}
        </CredentialsContext.Provider>
    )
}

export default CredentialsContext