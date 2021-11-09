// React
import { FC } from "react";
// Librairies
import { Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import List from "components/Modules/List/List";
import { api } from "api/api.request";
import { ApiListDataResult, Search } from "api/types/api";
import PostShort from "components/Submodules/PostShort/PostShort";
import { Post } from "api/types/post";

const Saved: FC<{}> = () => {
	async function fetchSavedPost(options: Search): Promise<ApiListDataResult<Post>> {
		return api.post.saved(options);
	}

	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H2}>Post(s) auvegardé(s)</Title>

			<List
				fetchItems={fetchSavedPost}
				customNoItemsElement={
					<>
						<Title style={{ margin: "15px 0px" }} semantic={TitleVariantEnum.H6}>
							Vous n'avez aucun post sauvegardé.
						</Title>
					</>
				}
				itemComponent={<PostShort />}
				itemProp='post'
			/>
		</Box>
	);
};

export default Saved;
