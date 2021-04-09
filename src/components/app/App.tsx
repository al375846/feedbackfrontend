import React, { useState, useEffect } from "react"
import PublicationList from "../publications/PublicationList"
import api from '../../api/Api'

const App = () => {

    let setCookie = (name: string, value: any) => {
        document.cookie = name + "=" + (value || "") + "; path=/"
    };

    let getCookie = (name: string) => {
        let nameEQ = name + "="
        let ca = document.cookie.split(";")
        for (var i = 0; i < ca.length; i++) {
          let c = ca[i]
          while (c.charAt(0) === " ") c = c.substring(1, c.length)
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    const [token, setToken] = useState<string>(getCookie('token') ? getCookie('token')!! : '')

    useEffect(() => {
        const login = async () => {
            const {data} = await api.post('/api/login_check', {
                username: 'carlosmo',
                password: 'carlosmo'
            })
            setToken(data.token)
            setCookie('token', token)
        }

        if (getCookie('token'))
            setToken(getCookie('token')!!)
        else
            login()
        
    }, [])


    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <PublicationList token={token}/>
        </div>
    )

}

export default App