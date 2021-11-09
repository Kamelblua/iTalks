import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		borderRadius: "5px",
		border: "solid 1px var(--text)",
		boxShadow: "var(--medium-box-shadow)",
		padding: "15px",
		margin: "15px 0px",
	},
	userInfos: {
		marginBottom: "15px",
	},
	timestamp: {
		fontStyle: "italic",
		opacity: 0.5,
	},
	childrenCommentButton: {
		width: "max-content",
		"&:hover": {
			cursor: "pointer",
		},
	},
});

export { useStyles };
