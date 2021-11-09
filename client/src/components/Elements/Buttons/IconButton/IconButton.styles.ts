import { makeStyles } from "@material-ui/core";
import { IconButtonStylesProps, IconButtonSizeType } from "./IconButton.d";

const SIZES: IconButtonSizeType = {
	sm: "16px",
	md: "32px",
	lg: "48px",
};

const useStyles = makeStyles({
	default: {
		padding: ".50em",
		height: "auto",
		width: "auto",
		color: (props: IconButtonStylesProps) => (props.light ? "var(--text)" : "var(--bg)"),
		background: (props: IconButtonStylesProps) => (props.type ? `var(--${props.type})` : "var(--purple)"),
		"&:hover": {
			background: (props: IconButtonStylesProps) => (props.type ? `var(--${props.type}-focus)` : "var(--purple-focus)"),
		},
	},
	icon: {
		fontSize: (props: IconButtonStylesProps) => (props.size ? SIZES[props.size] : "16px"),
	},
});

export { useStyles };
