import React, { FunctionComponent } from 'react'
import { Tabs } from 'react-bootstrap'

interface ApprenticeProfileProps {

}

const ApprenticeProfile: FunctionComponent<ApprenticeProfileProps> = () => {

    return (
        <div>
            <div>
                <Tabs fill defaultActiveKey="profileap" 
                    id="apprentice-profile">
                    {/* <Tab eventKey="profileap" title="Profile">
                        <ProfileInfo />
                    </Tab>
                    <Tab eventKey="historyap" title="History">
                        <HistoryInfo />
                    </Tab> */}
                </Tabs>
            </div>
        </div>
    )
}

export default ApprenticeProfile