import React, { useState, useEffect } from "react"
import {BrowserRouter, Route} from 'react-router-dom'

import PublicationList from "../publications/PublicationList"
import api from '../../api/Api'
import { CredentialsProvider } from "../../contexts/CredentialsContext"
import Header from "../header/Header"
import FeedbackList from "../feedbacks/FeedbackList"

const App = () => {

    const [token, setToken] = useState<string>('')
    const [usertype, setUsertype] = useState<string>('apprentice')

    useEffect(() => {
        const login = async () => {
            const {data} = await api.post('/api/login_check', {
                username: 'carlosmo',
                password: 'carlosmo'
            })
            setToken(data.token)
           
        }

        const type = async () => {
            const {data} = await api.get('/api/usertype', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUsertype(data.usertype)
        }

        login().then(type)
        
    }, [])

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <CredentialsProvider value={{token:token, usertype:usertype}}>
                <BrowserRouter>
                <Header />
                <Route path="/" exact component={PublicationList}/>
                <Route path="/feedback" component={FeedbackList} />
                </BrowserRouter>
            </CredentialsProvider>
        </div>
    )

}

export default App