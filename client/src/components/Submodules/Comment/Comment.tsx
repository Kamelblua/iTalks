import { Box, Typography } from "@material-ui/core";
import { Comment as CommentType } from "api/types/comment";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { FC, ReactElement, useEffect, useState } from "react";
import Avatar from "components/Elements/Avatar/Avatar";
import moment from "moment";
import BullDivider from "components/Elements/Layout/BullDivider/BullDivider";
import { useStyles } from "./Comment.styles";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import { api } from "api/api.request";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";

interface CommentProps {
	comment?: CommentType;
	[x: string]: any;
}

const Comment: FC<CommentProps> = ({ comment, ...rest }): ReactElement<any, any> | null => {
	const styles = useStyles();

	const [showChildren, setShowChildren] = useState(false);
	const [childrenComments, setChildrenComments] = useState<CommentType[]>([]);

	const displayChilrenLabel = () => {
		return (showChildren ? "Cacher " : "Afficher ") + comment!.children_comment_count + " réponse(s)";
	};

	useEffect(() => {
		if (showChildren) {
			api.comment
				.getChildren(comment!.id)
				.then((res) => {
					setChildrenComments(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [showChildren]);

	if (!comment) {
		return null;
	}

	return (
		<Box className={styles.container} {...rest}>
			<Flex className={styles.userInfos} direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
				<Avatar username={comment.user.username} link={comment.user.avatar} />
				<ResetLink to={"/profile/" + comment.user.id}>
					<Typography component='pre' style={{ marginLeft: "15px" }}>
						{comment.user.username}
					</Typography>
				</ResetLink>
				<BullDivider />
				<Typography className={styles.timestamp}>{moment(comment.created_at).fromNow()}</Typography>
			</Flex>
			<Typography>{comment.text}</Typography>

			{comment.children_comment_count > 0 && (
				<IconWithText
					className={styles.childrenCommentButton}
					margin='15px 0px'
					textColor='var(--info)'
					start={false}
					icon={showChildren ? <IoMdArrowDropup color='var(--info)' /> : <IoMdArrowDropdown color='var(--info)' />}
					size='14px'
					label={displayChilrenLabel()}
					onClick={() => {
						setShowChildren(!showChildren);
					}}
				/>
			)}

			{showChildren && childrenComments.length > 0 && childrenComments.map((c, k) => <Comment comment={c} key={k} />)}
		</Box>
	);
};

export default Comment;
