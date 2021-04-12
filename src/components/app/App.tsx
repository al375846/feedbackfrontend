import React, { useState, useEffect } from "react"
import {BrowserRouter, Route} from 'react-router-dom'

import PublicationList from "../publications/PublicationList"
import api from '../../api/Api'
import { TokenProvider } from "../../contexts/TokenContext"
import Header from "../header/Header"
import FeedbackList from "../feedbacks/FeedbackList"

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

        login()
        
    }, [])

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <TokenProvider value={token}>
                <Header />
                <BrowserRouter>
                <Route path="/" exact component={PublicationList}/>
                <Route path="/feedback" component={FeedbackList} />
                </BrowserRouter>
            </TokenProvider>
        </div>
    )

}

export default App