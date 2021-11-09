import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export default function AdminRoutes() {
	let { url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${url}/users`}></Route>
			<Route exact path={`${url}/user/create`}></Route>
			<Route exact path={`${url}/user/:username`}></Route>
			<Route exact path={`${url}/user/:username/edit`}></Route>

			<Route path='*'></Route>
		</Switch>
	);
}
