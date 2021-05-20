import React, { FunctionComponent, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import CredentialsContext from '../../../../contexts/CredentialsContext'

import HistoryInfo from '../HistoryInfo'
import ProfileInfo from '../ProfileInfo'

interface ApprenticeProfileProps {

}

const ApprenticeProfile: FunctionComponent<ApprenticeProfileProps> = () => {

    const credentials = useContext(CredentialsContext);

    if (!credentials.token)
        return ( 
            <div style={{textAlign: 'center'}}>
                <h1>
                    Please Login or Register
                </h1>
            </div> 
        )

    return (
        <div>
            <div>
                <Tabs fill defaultActiveKey="profileap" 
                    id="apprentice-profile">
                    <Tab eventKey="profileap" title="Profile">
                        <ProfileInfo />
                    </Tab>
                    <Tab eventKey="historyap" title="History">
                        <HistoryInfo />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ApprenticeProfile