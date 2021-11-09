import { FC, Fragment } from "react";
import { Box, Tooltip, Typography } from "@material-ui/core";
import Avatar from "components/Elements/Avatar/Avatar";
import { Badge as BadgeType } from "api/types/badge";
import { useStyles } from "components/Submodules/Profile/Badge/Badge.styles";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

interface RoleBadgeProps {
	badge: BadgeType;
}

const Badge: FC<RoleBadgeProps> = ({ badge }) => {
	return (
		<Tooltip
			title={
				<Fragment>
					<Title style={{ textAlign: "center" }} semantic={TitleVariantEnum.H6} color='inherit'>
						{badge.name}
					</Title>
					<Typography style={{ textAlign: "center" }}>{badge.description}</Typography>
				</Fragment>
			}
			placement='top'
		>
			<Box m='0px 10px'>
				<Avatar username={badge.name} link={badge.resource} />
			</Box>
		</Tooltip>
	);
};

export default Badge;
