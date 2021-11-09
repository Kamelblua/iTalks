import { FC } from "react";
import { Box } from "@material-ui/core";
import { UserProfil } from "api/types/user";

import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum, FlexAlignEnum } from "components/Elements/Layout/Flex/Flex.d";

import Badge from "components/Submodules/Profile/Badge/Badge";

export interface UserProps {
	user: UserProfil;
	[x: string]: any;
}

const BadgeList: FC<UserProps> = ({ user, ...rest }) => {
	return (
		<Box mt='10px' p='25px' boxShadow='var(--medium-box-shadow)'>
			<Flex direction={FlexDirectionEnum.Horizontal}>
				{user.badges.map((b, k) => (
					<Badge key={k} badge={b} />
				))}
			</Flex>
		</Box>
	);
};

export default BadgeList;
