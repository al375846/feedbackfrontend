import React, { FunctionComponent } from 'react'
import LoggedInfo from './components/LoggedInfo'

interface LoggedViewProps {
    onHandleLogout: () => void,
    favs: () => boolean,
    username: string,
    usertype: string
}

const LoggedView: FunctionComponent<LoggedViewProps> = (
    {
        onHandleLogout,
        favs,
        username,
        usertype
    }
) => {
    return (
        <LoggedInfo 
            onHandleLogout={onHandleLogout}
            favs={favs}
            username={username}
            usertype={usertype}/>
    )
}

export default LoggedView
