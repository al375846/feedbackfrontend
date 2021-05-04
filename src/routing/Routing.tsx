import React, {FunctionComponent} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {ROUTE_BASE, ROUTE_REGISTER} from "./Routes";
import PublicationList from "../modules/publications/PublicationList";
import PublicationInfo from "../components/publicationinfo/PublicationInfo";
import ApprenticeProfile from "../components/profiles/apprentice/ApprenticeProfile";
import ExpertProfile from "../components/profiles/expert/ExpertProfile";
import AdminProfile from "../components/profiles/admin/AdminProfile";
import RankingInfo from "../modules/rankings/RankingInfo";
import Register from "../modules/auth/register/Register";
import Layout from "../components/layout/Layout";

const Routing: FunctionComponent = (
    {

    }
) => {
    return (

        <BrowserRouter>
            <Layout>
                <Route path={ROUTE_BASE} exact component={PublicationList}/>
                <Route path="/publication/:id" exact component={PublicationInfo}/>
                <Route path="/profile/apprentice" exact component={ApprenticeProfile}/>
                <Route path="/profile/expert" exact component={ExpertProfile}/>
                <Route path="/profile/admin" exact component={AdminProfile}/>
                <Route path="/ranking" exact component={RankingInfo}/>
                <Route path={ROUTE_REGISTER} exact component={Register}/>
            </Layout>
        </BrowserRouter>
    );
};

export default Routing;
