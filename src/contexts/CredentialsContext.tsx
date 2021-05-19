import React, { useState } from 'react'

export interface CredentialsData {
    token: string,
    usertype: string,
    username: string,
    onTokenChange: (token: string) => void,
    onUsertypeChange: (usertype: string) => void,
    onUsernameChange: (username: string) => void
}

export enum CredentialsUsertype {
    ADMIN = 'admin',
    APPRENTICE = 'apprentice',
    EXPERT = 'expert'
}

const CredentialsContext = React.createContext<CredentialsData>({
    token: '', usertype: 'apprentice', username: '',
    onTokenChange: () => null, onUsertypeChange: () => null, onUsernameChange: () => null
})

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

    return (
        <CredentialsContext.Provider value={{token: token, usertype: usertype, username: username,
        onTokenChange:onTokenChange, onUsertypeChange:onUsertypeChange, onUsernameChange:onUsernameChange}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}

export default CredentialsContext