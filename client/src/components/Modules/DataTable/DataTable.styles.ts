import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	tableContainer: {
		position: "relative",
		margin: "30px 0px",
		border: "solid 1px var(--text)",
		background: "var(--bg)",
	},
	loadingOverlay: {
		height: "100%",
		width: "100%",
		position: "absolute",
		zIndex: 99,
		background: "var(--link-hover)",
	},
	icon: {
		fontSize: "35px",
		margin: "0px 10px",
		"&:hover": {
			cursor: "pointer",
		},
	},
});

export { useStyles };
