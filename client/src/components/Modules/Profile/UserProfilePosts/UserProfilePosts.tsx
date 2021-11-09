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
import PostShort from "components/Submodules/PostShort/PostShort";
import { ApiListDataResult, Search } from "api/types/api";
import { Post } from "api/types/post";
import auth from "api/auth";

export interface UserProps {
	userId: number;
	[x: string]: any;
}

const UserProfilePosts: FC<UserProps> = ({ userId, ...rest }) => {
	async function fetchProfilPosts(options: Search): Promise<ApiListDataResult<Post>> {
		return api.post.profilPosts(userId, options);
	}

	return (
		<Box {...rest}>
			<List
				fetchItems={fetchProfilPosts}
				customNoItemsElement={
					<>
						<Title semantic={TitleVariantEnum.H6}>
							{auth.getUserId() === userId
								? "Vous n'avez pas encore publié."
								: "Cet utilisateur n'a pas encore publié."}
						</Title>
						{auth.getUserId() !== userId && (
							<Typography style={{ textAlign: "center" }}>
								Commencez à le suivre pour vous tenir informé lors d'une nouvelle publication.
							</Typography>
						)}
					</>
				}
				itemComponent={<PostShort />}
				itemProp='post'
			/>
		</Box>
	);
};

export default UserProfilePosts;
