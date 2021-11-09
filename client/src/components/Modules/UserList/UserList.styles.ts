import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	selected: {
		background: "var(--text)",
		color: "var(--bg)",
		"&:hover": {
			background: "var(--text)",
			color: "var(--bg)",
		},
	},
	notSelected: {
		"&:hover": {
			background: "var(--text)",
			color: "var(--bg)",
		},
	},
});

export { useStyles };
