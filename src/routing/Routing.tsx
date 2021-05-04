import React, {FunctionComponent} from "react";
import {BrowserRouter, Route} from "react-router-dom";

import {ROUTE_BASE, ROUTE_PROFILE_ADMIN, ROUTE_PROFILE_APPRENTICE, ROUTE_PROFILE_EXPERT, ROUTE_PUBLICATION_INFO, ROUTE_RANKING, ROUTE_REGISTER} from "./Routes";
import ApprenticeProfile from "../modules/profiles/apprentice/ApprenticeProfile";
import ExpertProfile from "../modules/profiles/expert/ExpertProfile";
import AdminProfile from "../modules/profiles/admin/AdminProfile";
import Layout from "../components/layout/Layout";
import PublicationList from "../modules/publications/publicationlist/PublicationList";
import PublicationInfo from "../modules/publications/publicationinfo/PublicationInfo";
import RankingInfo from "../modules/rankings/RankingInfo";
import Register from "../modules/auth/register/Register";

const Routing: FunctionComponent = (
    {

    }
) => {
    return (

        <BrowserRouter>
            <Layout>
                <Route path={ROUTE_BASE} exact component={PublicationList}/>
                <Route path={ROUTE_PUBLICATION_INFO} exact component={PublicationInfo}/>
                <Route path={ROUTE_PROFILE_APPRENTICE} exact component={ApprenticeProfile}/>
                <Route path={ROUTE_PROFILE_EXPERT} exact component={ExpertProfile}/>
                <Route path={ROUTE_PROFILE_ADMIN} exact component={AdminProfile}/>
                <Route path={ROUTE_RANKING} exact component={RankingInfo}/>
                <Route path={ROUTE_REGISTER} exact component={Register}/>
            </Layout>
        </BrowserRouter>
    );
};

export default Routing;
