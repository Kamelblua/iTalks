import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		padding: "10px 25px",
		margin: "15px 0px",
		border: (props: { color: string }) => `solid 1px ${props.color}`,
		boxShadow: "var(--small-box-shadow)",
	},
	categoryTag: {
		marginRight: "15px",
		fontSize: "32px",
	},
});

export { useStyles };
