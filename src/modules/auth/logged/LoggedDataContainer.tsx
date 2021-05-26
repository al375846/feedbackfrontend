import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import CredentialsContext, { isExpert } from '../../../contexts/CredentialsContext'
import { AuthRepository } from '../repository/AuthRepository'
import LoggedView from './LoggedView'

const LoggedDataContainer = () => {

    const credentials = useContext(CredentialsContext)
    const repository = new AuthRepository()
    const history = useHistory()

    const navigateToHome = () => history.push('/')

    const onHandleLogout = () => {

        const logData = {
            onesignal: localStorage.getItem('onesignal')!
        }

        repository.logout(logData)
        .then(() => {
            localStorage.removeItem('onesignal')
        })
        .catch(err => window.alert(err))
        .finally(() => {
            credentials.removeAll()
            navigateToHome()
        })
    }

    const favs = () => isExpert(credentials.usertype)

    return (
        <LoggedView 
            onHandleLogout={onHandleLogout}
            favs={favs}
            username={credentials.username}
            usertype={credentials.usertype}/>
    )
}

export default LoggedDataContainer
