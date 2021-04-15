import React from "react"
import {BrowserRouter, Route} from 'react-router-dom'

import PublicationList from "../publications/PublicationList"
import { CredentialsStore } from "../../contexts/CredentialsContext"
import Header from "../header/Header"
import FeedbackList from "../feedbacks/FeedbackList"
import PublicationInfo from "../publicationinfo/PublicationInfo"

const App = () => {

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <CredentialsStore>
                <BrowserRouter>
                <Header />
                <Route path="/" exact component={PublicationList}/>
                <Route path="/feedback" component={FeedbackList} />
                <Route path="/publication/:id" component={PublicationInfo}/>
                </BrowserRouter>
            </CredentialsStore>
        </div>
    )

}

export default App