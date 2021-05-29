import React, {FunctionComponent} from "react";
import {BrowserRouter, Route} from "react-router-dom";

import {ROUTE_BASE, ROUTE_FAVOURITE, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_PROFILE_ADMIN, ROUTE_PUBLICATION_INFO, ROUTE_RANKING, ROUTE_REGISTER, ROUTE_SUGGESTION} from "./Routes";
import Layout from "../components/layout/Layout";
import PublicationListScreen from "../modules/publications/list/PublicationListScreen";
import PublicationInfoScreen from "../modules/publications/detail/PublicationInfoScreen";
import RankingScreen from "../modules/rankings/RankingScreen";
import AdminScreen from "../modules/profiles/admin/AdminScreen";
import UserScreen from "../modules/profiles/user/UserScreen";
import SuggestionScreen from "../modules/suggestions/SuggestionScreen";
import FavCategoriesScreen from "../modules/favcategories/FavCategoriesScreen";
import RegisterScreen from "../modules/auth/register/RegisterScreen";
import LoginScreen from "../modules/auth/login/LoginScreen";
import PrivateRoute from "./PrivateRoute";

const Routing: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Layout>
                <PrivateRoute path={ROUTE_BASE} component={<PublicationListScreen />}/>
                <PrivateRoute path={ROUTE_PUBLICATION_INFO} component={<PublicationInfoScreen />}/>
                <PrivateRoute path={ROUTE_PROFILE} component={<UserScreen />}/>
                <PrivateRoute path={ROUTE_PROFILE_ADMIN} component={<AdminScreen />}/>
                <PrivateRoute path={ROUTE_RANKING} component={<RankingScreen />}/>
                <PrivateRoute path={ROUTE_SUGGESTION} component={<SuggestionScreen />}/>
                <PrivateRoute path={ROUTE_FAVOURITE} component={<FavCategoriesScreen />}/>
                <Route path={ROUTE_REGISTER} exact component={RegisterScreen}/>
                <Route path={ROUTE_LOGIN} exact component={LoginScreen}/>
            </Layout>
        </BrowserRouter>
    );
};

export default Routing;
