import { cloneElement, FC, Fragment } from "react";
import { RiShieldCheckFill, RiShieldStarFill } from "react-icons/ri";
import { HiCubeTransparent, HiTerminal } from "react-icons/all";

import { useStyles } from "./Role.styles";
import { Box, Tooltip, Typography } from "@material-ui/core";

const roleRelation: any = {
	developer: {
		fr: "Développeur",
		color: "#035397",
		icon: <HiTerminal />,
	},
	admin: {
		fr: "Admin",
		color: "#FF2626",
		icon: <RiShieldStarFill />,
	},
	moderator: {
		fr: "Modérateur",
		color: "#FF4C29",
		icon: <RiShieldCheckFill />,
	},
	company: {
		fr: "Entreprise",
		color: "var(--purple)",
		icon: <HiCubeTransparent />,
	},
};

interface RoleBadgeProps {
	role: string;
}

const Role: FC<RoleBadgeProps> = ({ role }) => {
	const styles = useStyles({ bg: roleRelation[role].color });

	return (
		<Tooltip
			title={
				<Fragment>
					<Typography style={{ fontSize: "18px" }}>{roleRelation[role].fr}</Typography>
				</Fragment>
			}
			placement='top'
		>
			<Box>
				{cloneElement(roleRelation[role].icon, {
					className: styles.root,
					fontSize: "24px",
				})}
			</Box>
		</Tooltip>
	);
};

export default Role;
