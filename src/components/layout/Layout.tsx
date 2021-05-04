import {Fragment, FunctionComponent} from "react";
import Header from "./Header";
import {ROUTE_REGISTER} from "../../routing/Routes";
import {useLocation} from "react-router";

interface LayoutProps {

}

const Layout: FunctionComponent<LayoutProps> = (
    {
        children,
    }
) => {
    const location = useLocation();

    if (location.pathname === ROUTE_REGISTER)
        return <Fragment>{children}</Fragment>;

    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    );
};

export default Layout;
