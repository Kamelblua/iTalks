import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		minWidth: "350px",
		borderRadius: "5px",
		border: "solid 1px var(--text)",
		margin: "25px",
		boxShadow: "var(--small-box-shadow)",
		flexWrap: "wrap",
		overflow: "hidden",
	},
	firstContainer: {
		padding: "15px 35px",
	},
	link: {
		padding: "5px 15px",
		margin: "0px",
		background: "var(--text)",
		color: "var(--bg)",
		transition: "all .1s ease-in",
		"&:hover": {
			color: "var(--info)",
		},
	},
});

export { useStyles };
