import React from "react"
import {BrowserRouter, Route} from 'react-router-dom'

import PublicationList from "../publications/PublicationList"
import { CredentialsStore } from "../../contexts/CredentialsContext"
import Header from "../header/Header"
import FeedbackList from "../feedbacks/FeedbackList"
import PublicationInfo from "../publicationinfo/PublicationInfo"
import ApprenticeProfile from "../profiles/apprentice/ApprenticeProfile"
import ExpertProfile from "../profiles/expert/ExpertProfile"
import AdminProfile from "../profiles/admin/AdminProfile"

const App = () => {

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <CredentialsStore>
                <BrowserRouter>
                <Header />
                <Route path="/" exact component={PublicationList}/>
                <Route path="/feedback" component={FeedbackList} />
                <Route path="/publication/:id" component={PublicationInfo}/>
                <Route path="/profile/apprentice" component={ApprenticeProfile}/>
                <Route path="/profile/expert" component={ExpertProfile}/>
                <Route path="/profile/admin" component={AdminProfile}/>
                </BrowserRouter>
            </CredentialsStore>
        </div>
    )

}

export default App