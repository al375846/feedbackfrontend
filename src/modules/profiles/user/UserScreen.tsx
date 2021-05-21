import React from 'react'
import { UserStore } from '../../../contexts/UserContext'
import UserDataContainer from './UserDataContainer'
import UserEditDataContainer from './UserEditDataContainer'

const UserScreen = () => {
    return (
        <UserStore>
            <UserDataContainer />
            <UserEditDataContainer />
        </UserStore>
    )
}

export default UserScreen
