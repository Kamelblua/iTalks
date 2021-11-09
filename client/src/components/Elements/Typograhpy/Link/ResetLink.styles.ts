import { makeStyles } from "@material-ui/core";

type ResetLinkStylesProps = {
	color?: string;
};

const useStyles = makeStyles({
	link: {
		width: "max-content",
		position: "relative",
		margin: "0px",
		padding: "0px",
		textDecoration: "none",
		transition: "all .1s ease-in",
		"&:hover": {
			color: (props: ResetLinkStylesProps) => (props.color ? props.color : "var(--link-hover)"),
		},
		"&:visited": {
			color: "inherit",
		},
		"&:selected": {
			color: "inherit",
		},
	},
});

export { useStyles };
