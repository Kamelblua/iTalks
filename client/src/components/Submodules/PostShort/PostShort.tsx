import { FC, ReactElement } from "react";

import { Typography } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useStyles } from "./PostShort.styles";
import moment from "moment";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { RiChat4Line } from "react-icons/ri";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import VoteCount from "../VoteCount/VoteCount";
import CategoryBadge from "components/Elements/Badge/CategoryBadge/CategoryBadge";
import BullDivider from "components/Elements/Layout/BullDivider/BullDivider";

export interface PostProps {
	post?: PostType;
}

const PostShort: FC<PostProps> = ({ post }): ReactElement<any, any> | null => {
	const styles = useStyles();

	const shortenContent = (content: string) => {
		return content.substring(0, 150) + "...";
	};

	if (!post) {
		return null;
	}

	return (
		<Flex className={styles.container} direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.SpaceBetween}>
			<Flex direction={FlexDirectionEnum.Vertical} className={styles.infos}>
				<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
					<ResetLink to={"/post/" + post.id}>
						<Title semantic={TitleVariantEnum.H4}>{post.title}</Title>
					</ResetLink>
					<VoteCount votes={post.vote_count} positive={post.feedback} />
					{post.categories.map((c, k) => (
						<CategoryBadge category={c} key={k} />
					))}
				</Flex>

				<Typography className={styles.content}>{shortenContent(post.text)}</Typography>

				<Flex
					className={styles.postInfo}
					align={FlexAlignEnum.Center}
					justify={FlexJustifyEnum.SpaceBetween}
					direction={FlexDirectionEnum.Horizontal}
				>
					<Flex align={FlexAlignEnum.Center} direction={FlexDirectionEnum.Horizontal}>
						<ResetLink to={`/profile/${post.user.id}`}>
							<Typography className={styles.user}>{post.user.username}</Typography>
						</ResetLink>
						<BullDivider />
						<Typography className={styles.date}>{moment(post.created_at).fromNow()}</Typography>
					</Flex>
					<IconWithText start icon={<RiChat4Line fontSize='18px' />} label={post.comment_count.toString()} />
				</Flex>
			</Flex>
			{post.assiociated_resources ? (
				<img src={post.assiociated_resources[0].link} alt='post img' className={styles.image} />
			) : null}
		</Flex>
	);
};

export default PostShort;
