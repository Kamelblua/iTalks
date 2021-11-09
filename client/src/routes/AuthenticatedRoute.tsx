// React libraries

import { FC } from "react";
import { Redirect, Route } from "react-router-dom";

// Api interface
import auth from "api/auth";

interface AuthenticatedRouteProps {
	children: JSX.Element | JSX.Element[];
	[x: string]: any;
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ children, ...rest }) => {
	return (auth.isAuthenticated() && <Route {...rest}>{children}</Route>) || <Redirect to='/login' />;
};

export default AuthenticatedRoute;
