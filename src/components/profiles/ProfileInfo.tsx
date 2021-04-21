import React, { useContext } from 'react'
import CredentialsContext from '../../contexts/CredentialsContext'

const ProfileInfo = () => {

    const credentials = useContext(CredentialsContext)


    return (
        <div>
            {credentials.usertype}
        </div>
    )
}

export default ProfileInfo