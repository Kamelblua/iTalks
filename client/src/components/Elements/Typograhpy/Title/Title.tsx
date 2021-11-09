import { Typography } from "@material-ui/core";
import { FC } from "react";
import { TitleProps } from "./Title.d";
import { useStyles } from "./Title.styles";

const Title: FC<TitleProps> = ({ semantic, children, ...rest }) => {
	const styles = useStyles();

	return (
		<Typography className={styles.title} variant={semantic} component='h2' gutterBottom {...rest}>
			{children}
		</Typography>
	);
};

export default Title;
