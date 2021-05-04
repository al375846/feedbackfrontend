import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import RankingDetails from './RankingDetails'

const RankingInfo = () => {
    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="ratedexperts" id="rankings">
                <Tab eventKey="ratedexperts" title="Rated experts">
                    <RankingDetails type="rated/experts"/>
                </Tab>
                <Tab eventKey="activeexperts" title="Active experts">
                    <RankingDetails type="active/experts"/>
                </Tab>
                <Tab eventKey="activecategories" title="Active Categories">
                    <RankingDetails type="active/categories"/>
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default RankingInfo