import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	container: {
		overflowY: "auto",
		marginBottom: "10px",
		height: "100%",
		scrollbarColor: "var(--info) transparent",
		scrollbarWidth: "thin",
		"&::-webkit-scrollbar": {
			width: "7px",
		},
		"&::-webkit-scrollbar-track": {
			background: "transparent",
		},
		"&::-webkit-scrollbar-thumb": {
			background: "var(--info)",
			borderRadius: "10px",
		},
	},
	timestamp: {
		color: "var(--text)",
	},
	message: {
		width: "max-content",
		maxWidth: "70%",
		borderRadius: "5px",
		padding: "10px",
	},
	senderMessage: {
		background: "#48B0F7",
	},
	receiverMessage: {
		background: "var(--text)",
		color: "var(--bg)",
	},
});

export { useStyles };
