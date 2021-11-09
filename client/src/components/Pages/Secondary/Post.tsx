import { Box, Typography } from "@material-ui/core";
import { api } from "api/api.request";
import { Post as PostType } from "api/types/post";
import Loading from "components/Elements/Animations/Loading/Loading";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import CommentSection from "components/Modules/CommentSection/CommentSection";
import { FC, useEffect, useState } from "react";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { useRouteMatch } from "react-router-dom";
import { useStyles } from "./Post.styles";

interface MatchParams {
	id: string;
}

const Post: FC<{}> = () => {
	const styles = useStyles();
	let match = useRouteMatch<MatchParams>("/post/:id");

	const [post, setPost] = useState<PostType | null>(null);
	const [loading, setLoading] = useState(true);

	const savePost = (id: number) => {
		api.post
			.save(id)
			.then((res) => {
				console.log(res.data);
				post!.saved = true;
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const unsavePost = (id: number) => {
		api.post
			.unsave(id)
			.then((res) => {
				console.log(res.data);
				post!.saved = false;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		setLoading(true);

		api.post
			.get(parseInt(match!.params.id))
			.then((res) => {
				console.log(res.data);
				setPost(res.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {};
	}, [match?.params.id]);

	return (
		<Box>
			{loading ? (
				<Flex direction={FlexDirectionEnum.Horizontal}>
					<Loading />
				</Flex>
			) : (
				post && (
					<Flex direction={FlexDirectionEnum.Vertical}>
						<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
							<Title semantic={TitleVariantEnum.H3}>{post.title}</Title>
							{post.saved ? (
								<HiBookmark
									onClick={() => {
										unsavePost(post.id);
									}}
									className={styles.saved}
									size={50}
								/>
							) : (
								<HiOutlineBookmark
									onClick={() => {
										savePost(post.id);
									}}
									className={styles.saved}
									size={50}
								/>
							)}
						</Flex>
						<Typography style={{ margin: "150px 0px" }}>{post.text}</Typography>

						<Title semantic={TitleVariantEnum.H5}>Commentaires ({post.comment_count})</Title>

						<CommentSection postId={post.id} />
					</Flex>
				)
			)}
		</Box>
	);
};

export default Post;
