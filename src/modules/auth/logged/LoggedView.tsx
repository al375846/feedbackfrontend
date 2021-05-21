import React, { FunctionComponent } from 'react'
import LoggedInfo from './components/LoggedInfo'

interface LoggedViewProps {
    onHandleLogout: () => void,
    favs: () => boolean,
    username: string
}

const LoggedView: FunctionComponent<LoggedViewProps> = (
    {
        onHandleLogout,
        favs,
        username
    }
) => {
    return (
        <LoggedInfo 
            onHandleLogout={onHandleLogout}
            favs={favs}
            username={username}/>
    )
}

export default LoggedView
