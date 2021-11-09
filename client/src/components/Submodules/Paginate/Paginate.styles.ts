import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		margin: "15px 0px",
		"& .MuiPaginationItem-root": {
			backgroundColor: "transparent",
			color: "var( --text)",
			borderColor: "var(--purple)",
		},
		"& .Mui-selected": {
			background: "var(--purple)",
			color: "var(--text)",
		},
	},
});

export { useStyles };
