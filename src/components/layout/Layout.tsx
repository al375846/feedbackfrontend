import { Fragment, FunctionComponent, useContext } from "react"
import Header from "./Header"
import { ROUTE_LOGIN, ROUTE_REGISTER } from "../../routing/Routes"
import { useHistory, useLocation } from "react-router"
import CredentialsContext from "../../contexts/CredentialsContext"

interface LayoutProps {

}

const Layout: FunctionComponent<LayoutProps> = (
    {
        children,
    }
) => {
    const location = useLocation()
    const history = useHistory()
    const credentials = useContext(CredentialsContext)

    if (!credentials.token && location.pathname !== ROUTE_REGISTER && location.pathname !== ROUTE_LOGIN )
        history.push('/login')

    if (location.pathname === ROUTE_REGISTER || location.pathname === ROUTE_LOGIN)
        return <Fragment>{children}</Fragment>

    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    );
};

export default Layout;