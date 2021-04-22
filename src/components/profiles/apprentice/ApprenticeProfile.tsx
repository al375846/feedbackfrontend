import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import HistoryInfo from '../HistoryInfo'
import ProfileInfo from '../ProfileInfo'

const ApprenticeProfile = () => {
    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="profileap" id="uncontrolled-tab-example">
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