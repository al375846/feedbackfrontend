import React from "react"
import {CredentialsStore} from "./contexts/CredentialsContext"
import Routing from "./routing/Routing";

const App = () => {

    return (
        <div className={"app-container"}>
            <CredentialsStore>
                <Routing/>
            </CredentialsStore>
        </div>
    )

}

export default App
