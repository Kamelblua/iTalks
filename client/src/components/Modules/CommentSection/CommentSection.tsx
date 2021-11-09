import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import { api } from "api/api.request";
import { Comment as CommentType } from "api/types/comment";
import Loading from "components/Elements/Animations/Loading/Loading";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Comment from "components/Submodules/Comment/Comment";
import Paginate from "components/Submodules/Paginate/Paginate";
import { useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";
import { useStyles } from "components/Modules/CommentSection/CommentSection.styles";

interface CommentSectionProps {
	postId: number;
	[x: string]: any;
}

const CommentSection: FC<CommentSectionProps> = ({ postId, ...rest }) => {
	// Styles
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues, reset } = useForm();
	// Refs
	const topRef = useRef<HTMLDivElement>(null);
	// States
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);
	const [comments, setComments] = useState<CommentType[]>([]);
	const [total, setTotal] = useState(0);
	const [options, setOptions] = useState<{ page: number; limit: number }>({
		page: 1,
		limit: 15,
	});
	// Custom methods
	const send = () => {
		if (!sending) {
			setSending(true);

			api.comment
				.send(postId, getValues("message"))
				.then((res) => {
					reset();
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setSending(false);
				});
		}
	};
	const handleKeyDown = (e: any) => {
		if (e.keyCode === 13 && e.ctrlKey) {
			send();
		}
	};
	const changePage = (event: ChangeEvent<unknown>, value: number) => {
		if (topRef.current) {
			topRef.current.scrollIntoView();
		}
		setOptions({ ...options, page: value });
	};
	// Effects
	useEffect(() => {
		setLoading(true);

		api.comment
			.all(postId, options)
			.then((res) => {
				setComments(res.data.items);
				setTotal(res.data.total);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {};
	}, [options, postId]);

	return (
		<Box>
			<form className={styles.form} noValidate autoComplete='off' onSubmit={handleSubmit(send)}>
				<FormControl className={styles.messageFormControl} variant='outlined'>
					<OutlinedInput
						id='message'
						type='text'
						placeholder='Ajouter un commentaire ...'
						multiline
						{...register("message")}
						className={styles.messageInput}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={send}>
									<BiSend className={styles.messageInputIcon} />
								</IconButton>
							</InputAdornment>
						}
						onKeyDown={handleKeyDown}
					/>
				</FormControl>
			</form>
			<div ref={topRef} />
			{loading ? (
				<Loading />
			) : (
				<Box>
					{comments.map((c, k) => (
						<Comment comment={c} key={k} />
					))}
					<Paginate options={options} total={total} action={changePage} />
				</Box>
			)}
		</Box>
	);
};

export default CommentSection;
