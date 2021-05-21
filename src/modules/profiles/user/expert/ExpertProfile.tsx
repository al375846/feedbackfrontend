import React, { FunctionComponent } from 'react'
import { Tabs } from 'react-bootstrap'

interface ExpertProfileProps {

}

const ExpertProfile: FunctionComponent<ExpertProfileProps> = () => {

    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="profile" id="expert-profile">
                {/* <Tab eventKey="profile" title="Profile">
                    <ProfileInfo />
                </Tab>
                <Tab eventKey="history" title="History">
                    <HistoryInfo />
                </Tab>
                <Tab eventKey="favcategories" title="Fav categories">
                    <FavCategoriesInfo />
                </Tab> */}
            </Tabs>
            </div>
        </div>
    )
}

export default ExpertProfile