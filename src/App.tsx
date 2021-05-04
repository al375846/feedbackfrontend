import React from "react"
import {CredentialsStore} from "./contexts/CredentialsContext"
import Routing from "./routing/Routing";

const App = () => {

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <CredentialsStore>
                <Routing/>
            </CredentialsStore>
        </div>
    )

}

export default App
