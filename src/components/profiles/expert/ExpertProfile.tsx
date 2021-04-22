import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FavCategoriesInfo from './FavCategoriesInfo'
import HistoryInfo from '../HistoryInfo'
import ProfileInfo from '../ProfileInfo'

const ExpertProfile = () => {

    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="profile" title="Profile">
                    <ProfileInfo />
                </Tab>
                <Tab eventKey="history" title="History">
                    <HistoryInfo />
                </Tab>
                <Tab eventKey="favcategories" title="Fav categories">
                    <FavCategoriesInfo />
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default ExpertProfile