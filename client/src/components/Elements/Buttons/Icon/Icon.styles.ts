import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	icon: {
		fontSize: "35px",
		margin: "5px 0px",
		transition: "all .1s ease-in",
		color: "var(--text)",
		"&:hover": {
			cursor: "pointer",
			color: "var(--purple)",
		},
	},
	active: {
		color: "var(--purple)",
	},
});

export { useStyles };
