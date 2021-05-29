import React, { FunctionComponent, useContext } from 'react'
import { Redirect, Route } from 'react-router'
import CredentialsContext from '../contexts/CredentialsContext'
import { ROUTE_LOGIN } from './Routes'

interface PrivateRouteProps {
    path: string,
    component: JSX.Element
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = (
    {
        path,
        component
    }
) => {

    const credentials = useContext(CredentialsContext)

    const isLogged = () => (!!credentials.token)
    
    if (!isLogged() )
        return <Redirect to={ROUTE_LOGIN} />

    return <Route path={path} exact render={() => component} />
}

export default PrivateRoute
