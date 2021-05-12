import React, { FunctionComponent, useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import CredentialsContext from '../../contexts/CredentialsContext';
import RankingDetails from './RankingDetails';

interface RankingInfoProps {

}

const RankingInfo: FunctionComponent<RankingInfoProps> = () => {

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