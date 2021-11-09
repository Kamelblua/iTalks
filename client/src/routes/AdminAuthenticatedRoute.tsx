import { FC } from "react";

// React libraries
import { Redirect, Route } from "react-router-dom";

// Api interface
import auth from "api/auth";

interface AdminAuthenticatedRouteProps {
	children: JSX.Element | JSX.Element[];
	[x: string]: any;
}

const AdminAuthenticatedRoute: FC<AdminAuthenticatedRouteProps> = ({ children, ...rest }) => {
	return (auth.isAuthenticated() && auth.isAdmin() && <Route {...rest}>{children}</Route>) || <Redirect to='/' />;
};

export default AdminAuthenticatedRoute;
