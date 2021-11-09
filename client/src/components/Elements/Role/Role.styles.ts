import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		background: (props: { bg: string }) => props.bg,
		borderRadius: "5px",
		padding: "5px",
		margin: "0px 5px",
	},
});

export { useStyles };
