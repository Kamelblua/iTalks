import { makeStyles } from "@material-ui/core/styles";

interface AvatarStylesProps {
	color: string;
	size?: number;
}

const useStyles = makeStyles({
	avatar: {
		height: (props: AvatarStylesProps) => (props.size ? props.size + "px" : "45px"),
		width: (props: AvatarStylesProps) => (props.size ? props.size + "px" : "45px"),
	},
	avatarText: {
		textAlign: "center",
	},
	noLink: {
		background: (props: AvatarStylesProps) => props.color,
	},
});

export { useStyles };
