import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	input: {
		color: "var(--text)",
	},
	inputLabel: { color: "var(--text)" },
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: "var(--danger)",
	},

	button: {
		display: "block",
	},
	formControl: {
		minWidth: 120,
	},
}));

export { useStyles };
