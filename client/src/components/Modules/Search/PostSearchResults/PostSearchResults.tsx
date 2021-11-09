import { FC } from "react";
import { Box, Typography } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import moment from "moment";
import { useStyles } from "./PostSearchResults.styles";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";

interface PostSearchResultsProps {
	dataPosts: {
		posts: PostType[];
		total: number;
		count: number;
	};
}

const PostSearchResults: FC<PostSearchResultsProps> = ({ dataPosts }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<IconWithText
				size='35px'
				start
				icon={<HiOutlineChatAlt2 fontSize={50} />}
				label={dataPosts.posts.length > 0 ? "Posts - Meilleurs résultats" : "Aucun résultat"}
			/>

			{dataPosts.total > 0 &&
				dataPosts.posts.map((p, k) => (
					<ResetLink key={k} to={"/post/" + p.id}>
						<Flex
							className={styles.postContainer}
							direction={FlexDirectionEnum.Horizontal}
							align={FlexAlignEnum.Center}
						>
							<Title semantic={TitleVariantEnum.H6} className={styles.title}>
								{p.title}
							</Title>
							<Typography className={styles.user}>{p.user.username}</Typography>
							<Typography className={styles.date}>{moment(p.created_at).fromNow()}</Typography>
						</Flex>
					</ResetLink>
				))}
			{/* <Paginate /> */}
		</Box>
	);
};

export default PostSearchResults;
