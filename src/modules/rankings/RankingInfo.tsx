import React, { FunctionComponent } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Ranking } from '../../entities/Ranking';

import RankingDetails from './RankingDetails';

interface RankingInfoProps {
    ratedExperts: Ranking[] | undefined,
    activeExperts: Ranking[] | undefined,
    activeCategories: Ranking[] | undefined
}

const RankingInfo: FunctionComponent<RankingInfoProps> = (
    {
        ratedExperts,
        activeExperts,
        activeCategories
    }
) => {

    return (
        <div>
            <div>
                <Tabs fill defaultActiveKey="ratedexperts" id="rankings">
                    <Tab eventKey="ratedexperts" title="Rated experts">
                        <RankingDetails type="rated/experts" ranking={ratedExperts}/>
                    </Tab>
                    <Tab eventKey="activeexperts" title="Active experts">
                        <RankingDetails type="active/experts" ranking={activeExperts}/>
                    </Tab>
                    <Tab eventKey="activecategories" title="Active Categories">
                        <RankingDetails type="active/categories" ranking={activeCategories}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default RankingInfo