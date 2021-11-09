import { FC, useState, useEffect, memo } from "react";
import { Divider, FormControl, OutlinedInput, InputAdornment, IconButton, Typography } from "@material-ui/core";
import { Message as MessageType } from "api/types/message";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import { BiSend } from "react-icons/bi";
import Flex from "components/Elements/Layout/Flex/Flex";
import { useForm } from "react-hook-form";
import { useStyles } from "./ChatBox.styles";
import MessageList from "../MessageList/MessageList";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import auth from "api/auth";
import { api } from "api/api.request";
import Loading from "components/Elements/Animations/Loading/Loading";
import Echo from "laravel-echo";

export interface ChatBoxProps {
	fetchingUsers: boolean;
	recipientId: number;
}

const ChatBox: FC<ChatBoxProps> = memo(({ fetchingUsers, recipientId }) => {
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues, reset } = useForm();
	// States
	const [loading, setLoading] = useState(true);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [sending, setSending] = useState(false);
	// Custom methods
	const send = () => {
		if (!sending) {
			setSending(true);

			api.message
				.messageTo(recipientId, getValues("message"))
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

	useEffect(() => {
		if (!fetchingUsers && !isNaN(recipientId)) {
			setLoading(true);

			api.message
				.get(recipientId)
				.then((res) => {
					setMessages(res.data.items.reverse());
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setLoading(false);
				});

			const eventChannel = "Sender_" + auth.getUserId() + "_Receiver_" + recipientId;

			const EchoEvent = new Echo({
				broadcaster: "pusher",
				key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
				cluster: process.env.REACT_APP_MIX_PUSHER_APP_CLUSTER,
				forceTLS: false,
				wsHost: window.location.hostname,
				wsPort: 6001,
			});

			EchoEvent.channel(eventChannel).listen("RealTimeMessage", (e: any) => {
				setMessages((arr) => [...arr, JSON.parse(e.message)]);
			});
		}
	}, [fetchingUsers, recipientId]);

	return (
		<Flex
			style={{ padding: "0px 5px", color: "var(--text)", justifyContent: "flex-end" }}
			direction={FlexDirectionEnum.Vertical}
			width='70%'
		>
			{recipientId ? (
				<>
					{loading ? (
						<Flex
							direction={FlexDirectionEnum.Horizontal}
							justify={FlexJustifyEnum.Center}
							align={FlexAlignEnum.Center}
							height='100%'
						>
							<Loading radius={20} />
						</Flex>
					) : (
						<MessageList messages={messages} />
					)}

					<Divider />

					{!loading && (
						<form className={styles.form} noValidate autoComplete='off' onSubmit={handleSubmit(send)}>
							<FormControl className={styles.messageFormControl} variant='outlined'>
								<OutlinedInput
									id='message'
									type='text'
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
					)}
				</>
			) : (
				<Flex
					direction={FlexDirectionEnum.Vertical}
					justify={FlexJustifyEnum.Center}
					align={FlexAlignEnum.Center}
					height='100%'
				>
					<Title semantic={TitleVariantEnum.H6}>Vous n'avez pas sélectionné de destinataire.</Title>
					<Typography>Sélectionnez un destinataire existant ou commencez une nouvelle conversation.</Typography>
				</Flex>
			)}
		</Flex>
	);
});

export default ChatBox;
