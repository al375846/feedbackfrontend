import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import ProfileInfo from './ProfileInfo'

const ExpertProfile = () => {

    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="profile" title="Profile">
                    <ProfileInfo />
                </Tab>
                <Tab eventKey="history" title="History">
                    
                </Tab>
                <Tab eventKey="favcategories" title="Fav categories">
                    
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default ExpertProfile