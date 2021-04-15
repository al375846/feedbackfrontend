import React, { useState } from 'react'

export interface CredentialsData {
    token: string,
    usertype: string,
    onTokenChange: (token: string) => void
    onUsertypeChange: (usertype: string) => void
}

const CredentialsContext = React.createContext<CredentialsData>({
    token: '', usertype: 'apprentice', onTokenChange: () => null, onUsertypeChange: () => null,
})

export const CredentialsProvider = CredentialsContext.Provider

export interface CredentialsStoreProps {
    children: JSX.Element
}

export const CredentialsStore = (props: CredentialsStoreProps) => {
    const [token, setToken] = useState<string>('')
    const [usertype, setUsertype] = useState<string>('apprentice')

    const onTokenChange = (token: string) => {
        setToken(token)
    }

    const onUsertypeChange = (usertype: string) => {
        setUsertype(usertype)
    }

    return (
        <CredentialsContext.Provider value={{token: token, usertype: usertype, onTokenChange:onTokenChange, onUsertypeChange:onUsertypeChange}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}

export default CredentialsContext