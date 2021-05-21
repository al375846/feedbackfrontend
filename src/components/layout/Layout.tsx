import { Fragment, FunctionComponent, useContext } from "react";
import Header from "./Header";
import { ROUTE_REGISTER } from "../../routing/Routes";
import { useLocation } from "react-router";
import CredentialsContext from "../../contexts/CredentialsContext";
import LoginForm from "../../modules/auth/login/LoginForm";

interface LayoutProps {

}

const Layout: FunctionComponent<LayoutProps> = (
    {
        children,
    }
) => {
    const location = useLocation()
    const credentials = useContext(CredentialsContext)

    if (!credentials.token)
        return (
            <Fragment>
                <Header />
                <h1>Please Log in or Register</h1>
                <LoginForm />
            </Fragment>
        )

    if (location.pathname === ROUTE_REGISTER)
        return <Fragment>{children}</Fragment>

    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    );
};

export default Layout;