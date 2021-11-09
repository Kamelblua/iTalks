import { makeStyles } from "@material-ui/core";

interface CategoryBadgeStyleProps {
	color: string;
	text_color: string;
}

const useStyles = makeStyles({
	container: {
		color: (props: CategoryBadgeStyleProps) => (props.text_color ? props.text_color : "var(--light)"),
		background: (props: CategoryBadgeStyleProps) => (props.color ? props.color : "grey"),
		transform: "skew(-15deg)",
		padding: "5px",
		margin: "0px 5px",
	},
});

export { useStyles };
