import { makeStyles } from "@material-ui/core";

interface IconWithTextStylesProps {
	size?: string;
	textColor?: string;
}

const useStyles = makeStyles({
	label: {
		padding: "0px",
		color: (props: IconWithTextStylesProps) => (props.textColor ? props.textColor : "inherit"),
		fontSize: (props: IconWithTextStylesProps) => (props.size ? props.size : "18px"),
	},
});

export { useStyles };
