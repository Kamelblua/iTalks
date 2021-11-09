import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	floating: {
		position: "absolute",
		top: 0,
		right: 0,
	},
	sleeping: {
		position: "absolute",
		bottom: 0,
		left: 0,
	},
	refresh: {
		color: "var(--purple)",
		fontSize: "40px",
		transition: "all .2s ease-in",
		"&:hover": {
			transform: "rotateZ(-180deg)",
		},
	},
});

export { useStyles };
