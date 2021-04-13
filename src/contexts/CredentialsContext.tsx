import React from 'react'

export interface CredentialsData {
    token: string,
    usertype: string
}

const CredentialsContext = React.createContext<CredentialsData>({
    token: '', usertype: 'apprentice'
})

export const CredentialsProvider = CredentialsContext.Provider

export default CredentialsContext