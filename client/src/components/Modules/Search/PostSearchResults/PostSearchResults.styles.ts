import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		margin: "25px 0px",
		paddingLeft: "10px",
		borderLeft: "solid 5px var(--success)",
		borderRadius: "5px",
	},
	postContainer: {
		marginLeft: "35px",
		padding: "15px",
		transition: "all .1s ease-in",
		"&:hover": {
			background: "var(--text)",
			color: "var(--bg)",
			cursor: "pointer",
		},
	},
	title: {
		color: "inherit",
	},
	user: {
		margin: "0px 15px",
		fontStyle: "italic",
	},
	date: {
		fontStyle: "italic",
	},
});

export { useStyles };
