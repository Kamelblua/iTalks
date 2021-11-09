import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	tooltip: {
		position: "fixed",
		width: "max-content",
		height: "15px",
		background: "red",
		top: "0px",
		zIndex: 99,
	},
});

export { useStyles };
