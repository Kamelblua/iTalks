import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	searchLabel: {
		color: "var(--text)",
	},
	search: {
		color: "var(--text)",
		margin: "0px 15px",
	},
	searchInput: {
		color: "var(--text)",
	},
	notchedOutline: { borderWidth: "1px", borderColor: "var(--text) !important" },
	icon: {
		fill: "var(--text)",
	},
});

export { useStyles };
