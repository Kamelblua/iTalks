import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { ApiListDataResult, Search } from "api/types/api";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import PostShort from "components/Submodules/PostShort/PostShort";
import { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import List from "components/Modules/List/List";
import { Post } from "api/types/post";

interface MatchParams {
	name: string;
}

const CategoryPosts: FC<{}> = () => {
	let match = useRouteMatch<MatchParams>("/category/:name");

	const [reload, setReload] = useState(false);

	async function fetchCategoryPosts(options: Search): Promise<ApiListDataResult<Post>> {
		return api.category.get(match!.params.name, options);
	}

	useEffect(() => {
		setReload(!reload);
		return () => {};
	}, [match?.params.name]);

	return (
		<>
			{match && (
				<Box width='100%'>
					<Title style={{ marginBottom: "25px" }} semantic={TitleVariantEnum.H3}>
						Catégorie: {match.params.name}
					</Title>
					<List reload={reload} fetchItems={fetchCategoryPosts} itemComponent={<PostShort />} itemProp='post' />
				</Box>
			)}
		</>
	);
};

export default CategoryPosts;
