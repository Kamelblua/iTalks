import { makeStyles } from "@material-ui/core";
import { ButtonStylesProps, ButtonSizeType } from "./Button.d";

const SIZES: ButtonSizeType = {
	sm: "16px",
	md: "20px",
	lg: "24px",
};

const useStyles = makeStyles({
	default: {
		padding: ".25em 1.25em",
		fontFamily: "Roboto Black",
		color: (props: ButtonStylesProps) => (props.color ? props.color : "var(--text)"),
		fontSize: (props: ButtonStylesProps) => (props.size ? SIZES[props.size] : "16px"),
		width: (props: ButtonStylesProps) => (props.fullWidth ? "100%" : "max-content"),
		background: (props: ButtonStylesProps) => (props.variant ? `var(--${props.variant})` : "var(--purple)"),
		"&:hover": {
			background: (props: ButtonStylesProps) => (props.variant ? `var(--${props.variant}-focus)` : "var(--purple)"),
		},
	},
});

export { useStyles };
