import React from 'react'

const TokenContext = React.createContext<string>('')

export const TokenProvider = TokenContext.Provider

export default TokenContext