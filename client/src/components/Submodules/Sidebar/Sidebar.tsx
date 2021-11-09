// React
import { FC } from "react";
// Librairies
import { Link, useLocation } from "react-router-dom";
// Components
import { Divider } from "@material-ui/core";
import {
	HiHome,
	HiSearch,
	HiBookmark,
	HiOutlineUserCircle,
	HiChatAlt2,
	HiAdjustments,
	HiOutlineShieldExclamation,
} from "react-icons/hi";
import Icon from "components/Elements/Buttons/Icon/Icon";
// Api interface
import auth from "api/auth";

import { useStyles } from "./Sidebar.styles";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { AiOutlineDashboard } from "react-icons/ai";

const Sidebar: FC<{}> = () => {
	const styles = useStyles();

	let location = useLocation();
	const currentPath = location.pathname;

	return (
		<Flex direction={FlexDirectionEnum.Vertical} centered className={styles.sidebar}>
			<ResetLink to='/'>
				<Icon icon={<HiHome />} active={["/", "/home", "/categories", "/recent", "/new"].includes(currentPath)} />
			</ResetLink>
			<ResetLink to='/search'>
				<Icon icon={<HiSearch />} active={currentPath.includes("search")} />
			</ResetLink>
			<Link to='/saved'>
				<Icon icon={<HiBookmark />} active={currentPath.includes("saved")} />
			</Link>
			<Link to='/profile'>
				<Icon icon={<HiOutlineUserCircle />} active={currentPath.includes("profile")} />
			</Link>
			<Link to='/messages'>
				<Icon icon={<HiChatAlt2 />} active={currentPath.includes("messages")} />
			</Link>
			<Link to='/settings'>
				<Icon icon={<HiAdjustments />} active={currentPath.includes("settings")} />
			</Link>
			<Divider light style={{ width: "55%", background: "var(--text)", margin: "10px 0px" }} />
			{auth.isAdmin() && (
				<>
					<Link to='/admin/dashboard'>
						<Icon icon={<AiOutlineDashboard />} active={currentPath.includes("dashboard")} />
					</Link>
					<Link to='/admin/manage'>
						<Icon icon={<HiOutlineShieldExclamation />} active={currentPath.includes("manage")} />
					</Link>
				</>
			)}
		</Flex>
	);
};

export default Sidebar;

/**
 * AiOutlineDashboard
 */
