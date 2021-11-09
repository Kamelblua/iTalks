import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	form: {
		marginBottom: "25px",
	},
	messageFormControl: {
		width: "100%",
		overflowY: "auto",
		"&::-webkit-scrollbar": {
			display: "none",
		},
		maxHeight: "200px",
	},
	messageInput: {
		color: "var(--text)",
	},
	messageInputIcon: {
		color: "var(--text)",
	},
});

export { useStyles };
