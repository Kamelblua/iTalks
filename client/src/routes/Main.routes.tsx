import { FC } from "react";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import AuthenticatedRoute from "routes/AuthenticatedRoute";
import UnauthenticatedRoute from "routes/UnauthenticatedRoute";
import AdminAuthenticatedRoute from "routes/AdminAuthenticatedRoute";

import Home from "components/Pages/Home";
import Search from "components/Pages/Search";
import Notifications from "components/Pages/Notifications";
import Saved from "components/Pages/Saved";
import Profile from "components/Pages/Profile";
import Messages from "components/Pages/Messages";
import Settings from "components/Pages/Settings";
import SidebarFloat from "components/Submodules/SidebarFloat/SidebarFloat";
import NotFound404 from "components/Pages/NotFound404";
import TopContainer from "components/Modules/TopContainer";
import Sidebar from "components/Submodules/Sidebar/Sidebar";
import Logout from "components/Pages/Logout";
import LoginForm from "components/Pages/LoginForm";
import RegisterForm from "components/Pages/RegisterForm";
import CategoryPosts from "components/Pages/Secondary/CategoryPosts";
import Post from "components/Pages/Secondary/Post";
import Dashboard from "components/Pages/Admin/Dashboard";
import Manage from "components/Pages/Admin/Manage";
import VerifyMail from "components/Pages/Secondary/VeryMail";

const Routes: FC<{}> = () => {
	let location = useLocation();
	const currentPath = location.pathname;

	return (
		<>
			<Switch>
				{/* Authenticated main routes */}
				<AuthenticatedRoute exact path={["/", "/home", "/recent", "/categories", "/new"]}>
					<TopContainer sidebar={<Sidebar />} page={<Home />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/search'>
					<TopContainer sidebar={<Sidebar />} page={<Search />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/notifications'>
					<TopContainer sidebar={<Sidebar />} page={<Notifications />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/saved'>
					<TopContainer sidebar={<Sidebar />} page={<Saved />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path={["/profile", "/profile/:id"]}>
					<TopContainer sidebar={<Sidebar />} page={<Profile />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path={["/messages", "/messages/:id"]}>
					<TopContainer sidebar={<Sidebar />} page={<Messages />} sideMargin={70} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/settings'>
					<TopContainer sidebar={<Sidebar />} page={<Settings />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/logout'>
					<TopContainer page={<Logout />} />
				</AuthenticatedRoute>

				{/* Authenticated secondary routes */}
				<AuthenticatedRoute exact path='/category/:id'>
					<TopContainer sidebar={<Sidebar />} page={<CategoryPosts />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/post/:id'>
					<TopContainer sidebar={<Sidebar />} page={<Post />} />
				</AuthenticatedRoute>

				{/* Unauthenticated routes */}
				<UnauthenticatedRoute exact path='/login'>
					<LoginForm />
				</UnauthenticatedRoute>
				<UnauthenticatedRoute exact path='/register'>
					<RegisterForm />
				</UnauthenticatedRoute>

				{/* Admin routes */}
				<Route path='/admin'>
					<Switch>
						<AdminAuthenticatedRoute exact path='/admin/dashboard'>
							<TopContainer sidebar={<Sidebar />} page={<Dashboard />} />
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/manage'>
							<TopContainer sidebar={<Sidebar />} page={<Manage />} />
						</AdminAuthenticatedRoute>
					</Switch>
				</Route>

				{/* Public routes */}
				<Route exact path='/verify_email'>
					<VerifyMail />
				</Route>

				{/* No match */}
				<Route path='/404' exact>
					<NotFound404 />
				</Route>

				<Route path='/'>
					<Redirect to='/404' />
				</Route>
			</Switch>
			<SidebarFloat exclude={["/404"].includes(currentPath)} />
		</>
	);
};

export default Routes;
