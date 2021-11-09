import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		margin: "25px 0px",
		paddingLeft: "10px",
		borderLeft: "solid 5px var(--warning)",
		borderRadius: "5px",
	},
	categoryContainer: {
		marginLeft: "35px",
		padding: "15px",
		transition: "all .1s ease-in",
		"&:hover": {
			background: "var(--text)",
			color: "var(--bg)",
			cursor: "pointer",
		},
	},
	name: {
		margin: "0px 15px",
		fontWeight: "bold",
		color: "inherit",
	},
});

export { useStyles };
