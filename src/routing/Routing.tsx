import React, {FunctionComponent} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {ROUTE_BASE} from "./Routes";
import PublicationList from "../modules/publications/PublicationList";
import PublicationInfo from "../components/publicationinfo/PublicationInfo";
import ApprenticeProfile from "../components/profiles/apprentice/ApprenticeProfile";
import ExpertProfile from "../components/profiles/expert/ExpertProfile";
import AdminProfile from "../components/profiles/admin/AdminProfile";
import RankingInfo from "../modules/rankings/RankingInfo";
import Register from "../modules/auth/register/Register";
import Header from "../components/header/Header";

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = (
    {

    }
) => {
    return (
        <BrowserRouter>
            {window.location.pathname !== '/register' ? <Header /> : null}
            <Route path={ROUTE_BASE} exact component={PublicationList}/>
            <Route path="/publication/:id" component={PublicationInfo}/>
            <Route path="/profile/apprentice" component={ApprenticeProfile}/>
            <Route path="/profile/expert" component={ExpertProfile}/>
            <Route path="/profile/admin" component={AdminProfile}/>
            <Route path="/ranking" component={RankingInfo}/>
            <Route path="/register" component={Register}/>
        </BrowserRouter>
    );
};

export default Routing;
