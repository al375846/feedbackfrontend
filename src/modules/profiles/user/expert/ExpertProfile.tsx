import React, { FunctionComponent, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import FavCategoriesInfo from './FavCategoriesInfo'
import HistoryInfo from '../HistoryInfo'
import ProfileInfo from '../ProfileInfo'
import CredentialsContext from '../../../../contexts/CredentialsContext'

interface ExpertProfileProps {

}

const ExpertProfile: FunctionComponent<ExpertProfileProps> = () => {

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
            <Tabs fill defaultActiveKey="profile" id="expert-profile">
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