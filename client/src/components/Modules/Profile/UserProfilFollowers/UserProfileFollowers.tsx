// React
import { FC } from "react";
// Lib
import { Box, Typography } from "@material-ui/core";
// API
import { api } from "api/api.request";
// Components
import List from "components/Modules/List/List";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { ApiListDataResult, Search } from "api/types/api";
import auth from "api/auth";
import { UserShort as UserShortType } from "api/types/user";
import UserShort from "components/Submodules/UserShort/UserShort";

export interface UserProps {
	userId: number;
	[x: string]: any;
}

const UserProfileFollowers: FC<UserProps> = ({ userId, ...rest }) => {
	async function fetchFollowers(options: Search): Promise<ApiListDataResult<UserShortType>> {
		return api.user.followers(userId, options);
	}

	return (
		<Box {...rest}>
			<List
				fetchItems={fetchFollowers}
				customNoItemsElement={
					<>
						<Title semantic={TitleVariantEnum.H6}>
							{auth.getUserId() === userId ? "Aucun utilisateur ne vous suit." : "Cet utilisateur n'est pas suivit."}
						</Title>
						{auth.getUserId() !== userId && (
							<Typography style={{ textAlign: "center" }}>
								Commencez à suivre un utilisateur pour vous tenir informé lors d'une nouvelle publication.
							</Typography>
						)}
					</>
				}
				itemComponent={<UserShort />}
				itemProp='user'
			/>
		</Box>
	);
};

export default UserProfileFollowers;
