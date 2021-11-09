// React
import { FC } from "react";
// Lib
import { Box } from "@material-ui/core";
// API
import { api } from "api/api.request";
// Components
import List from "components/Modules/List/List";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { ApiListDataResult, Search } from "api/types/api";
import Comment from "components/Submodules/Comment/Comment";

export interface UserProps {
	userId: number;
	[x: string]: any;
}

const UserProfileCommens: FC<UserProps> = ({ userId, ...rest }) => {
	async function fetchCategoryComments(options: Search): Promise<ApiListDataResult<Comment>> {
		return api.post.profilComments(userId, options);
	}

	return (
		<Box {...rest}>
			<List
				fetchItems={fetchCategoryComments}
				customNoItemsElement={
					<>
						<Title semantic={TitleVariantEnum.H6}>Cet utilisateur n'a pas encore publié de commentaire.</Title>
					</>
				}
				itemComponent={<Comment />}
				itemProp='comment'
			/>
		</Box>
	);
};

export default UserProfileCommens;
