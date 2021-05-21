import React, {FunctionComponent} from "react";
import {BrowserRouter, Route} from "react-router-dom";

import {ROUTE_BASE, ROUTE_FAVOURITE, ROUTE_PROFILE, ROUTE_PROFILE_ADMIN, ROUTE_PUBLICATION_INFO, ROUTE_RANKING, ROUTE_REGISTER, ROUTE_SUGGESTION} from "./Routes";
import Layout from "../components/layout/Layout";
import Register from "../modules/auth/register/Register";
import PublicationListScreen from "../modules/publications/list/PublicationListScreen";
import PublicationInfoScreen from "../modules/publications/detail/PublicationInfoScreen";
import RankingScreen from "../modules/rankings/RankingScreen";
import AdminScreen from "../modules/profiles/admin/AdminScreen";
import UserScreen from "../modules/profiles/user/UserScreen";
import SuggestionScreen from "../modules/suggestions/SuggestionScreen";
import FavCategoriesScreen from "../modules/favcategories/FavCategoriesScreen";

const Routing: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Route path={ROUTE_BASE} exact component={PublicationListScreen}/>
                <Route path={ROUTE_PUBLICATION_INFO} exact component={PublicationInfoScreen}/>
                <Route path={ROUTE_PROFILE} exact component={UserScreen}/>
                <Route path={ROUTE_PROFILE_ADMIN} exact component={AdminScreen}/>
                <Route path={ROUTE_RANKING} exact component={RankingScreen}/>
                <Route path={ROUTE_SUGGESTION} exact component={SuggestionScreen}/>
                <Route path={ROUTE_FAVOURITE} exact component={FavCategoriesScreen}/>
                <Route path={ROUTE_REGISTER} exact component={Register}/>
            </Layout>
        </BrowserRouter>
    );
};

export default Routing;
