import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	rightContainer: {
		width: "50%",
		background: "var(--text)",
		animation: "$fadeIn 0.3s ease both",
	},
	leftContainer: {
		width: "50%",
		animation: "$fadeInFromRight 0.6s ease both",
		transform: "translateX(50%)",
	},
	form: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		marginBottom: "15px",
	},
	icon: {
		color: "var(--text)",
	},
	loading: {
		color: "var(--text)",
	},
	error: {
		color: "var(--danger)",
	},
	checkboxContainer: {
		width: "max-content",
	},
	checkbox: {
		color: "var(--text)!important",
	},
	submitContainer: {
		marginTop: "15px",
	},
	registerLink: {
		marginLeft: "15px",
	},

	"@keyframes fadeInFromRight": {
		from: {
			opacity: 0,
			visibility: "hidden",
		},
		to: {
			opacity: 1,
			visibility: "visible",
			transform: "translateX(0%)",
		},
	},
	"@keyframes fadeIn": {
		from: {
			opacity: 0.5,
			visibility: "hidden",
		},
		to: {
			opacity: 1,
			visibility: "visible",
		},
	},
});

export { useStyles };
