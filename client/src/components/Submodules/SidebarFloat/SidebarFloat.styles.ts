import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	default: {
		fontSize: "50px",
		"&:hover": {
			cursor: "pointer",
		},
	},
	open: {
		transition: "all .2s ease-in",
		"&:hover": {
			transform: "rotate(45deg)",
		},
	},
	subIcon: {
		fontSize: "35px",
		background: "rgba(5, 5, 5, 0.3)",
		color: "var(--text)",
		borderRadius: "50%",
		padding: ".25em",
		margin: "5px 0px",
		transition: "all .2s ease-in",
		"&:hover": {
			cursor: "pointer",
		},
	},
	notifications: {
		"&:hover": {
			color: "var(--info)",
		},
	},
	lightTheme: {
		"&:hover": {
			color: "#F9D71C",
		},
	},
	darkTheme: {
		"&:hover": {
			color: "white",
		},
	},
	logoutIcon: {
		"&:hover": {
			color: "var(--danger)",
		},
	},
});

export { useStyles };
