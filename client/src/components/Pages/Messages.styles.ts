import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	container: {
		border: "solid 1.25px rgba(255, 255, 255, 0.35)",
		boxShadow: "var(--medium-box-shadow)",
	},
	userListContainer: {
		width: "30%",
		borderRight: "solid 1.25px rgba(255, 255, 255, 0.35)",
	},
	inputSearch: {
		margin: "15px 0px",
		color: "var(--text) !important",
	},
});

export { useStyles };
