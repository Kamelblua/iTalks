import { Message } from "api/types/message";
import { FC, useEffect, useRef } from "react";
import { ListItemText, Typography } from "@material-ui/core";
import moment from "moment";
import { useStyles } from "./MessageList.styles";
import auth from "api/auth";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";

interface MessageListProps {
	messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
	// Styles
	const styles = useStyles();
	// Refs
	const messagesEndRef = useRef<HTMLDivElement>(null);
	// Custom methods
	const displayTime = (timestamp: string) => {
		const timestampFormatted = moment(timestamp).format("DD-MM-YYYY");
		const nowFormatted = moment().format("DD-MM-YYYY");

		if (timestampFormatted !== nowFormatted) {
			return moment(timestamp).format("DD-MM-YYYY kk:mm");
		}

		return moment(timestamp).format("kk:mm");
	};
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView();
		}
	};
	// Effects
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<Flex className={styles.container} direction={FlexDirectionEnum.Vertical} justify={FlexJustifyEnum.End}>
			{messages.length > 0 ? (
				<Flex direction={FlexDirectionEnum.Vertical}>
					{messages.map((m, k) => (
						<Flex key={k} direction={FlexDirectionEnum.Vertical} fullWidth>
							<ListItemText
								className={`${auth.getUserId() === m.sender.id ? styles.senderMessage : styles.receiverMessage} ${
									styles.message
								}`}
							>
								<Typography component='pre'>{m.message}</Typography>
							</ListItemText>
							<ListItemText
								secondaryTypographyProps={{ className: styles.timestamp }}
								secondary={displayTime(m.created_at)}
							></ListItemText>
						</Flex>
					))}
					<div ref={messagesEndRef} />
				</Flex>
			) : (
				<Flex
					direction={FlexDirectionEnum.Horizontal}
					justify={FlexJustifyEnum.Center}
					align={FlexAlignEnum.Center}
					height='100%'
				>
					<p>Vous n'avez pas commencé de discussion avec cet utilisateur.</p>
				</Flex>
			)}
		</Flex>
	);
};

export default MessageList;
