import React, { useState, useEffect } from "react"
import PublicationList from "../publications/PublicationList"
import api from '../../api/Api'

const App = () => {

    const [token, setToken] = useState<string>('')

    useEffect(() => {
        const login = async () => {
            const {data} = await api.post('/api/login_check', {
                username: 'carlosmo',
                password: 'carlosmo'
            })
            setToken(data.token)
           
        }

        if (!token)
            login()
        
    }, [])

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <PublicationList token={token}/>
        </div>
    )

}

export default App