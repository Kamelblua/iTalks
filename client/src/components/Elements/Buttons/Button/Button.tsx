import { FC } from "react";

import { Button as MaterialButton } from "@material-ui/core";

import { ButtonProps } from "./Button.d";
import { useStyles } from "./Button.styles";

const Button: FC<ButtonProps> = ({
	color,
	label,
	variant,
	size,
	fullWidth,
	startIcon,
	endIcon,
	className,
	...rest
}) => {
	const styles = useStyles({ color, variant, size, fullWidth });

	return (
		<MaterialButton className={`${styles.default} ${className}`} startIcon={startIcon} endIcon={endIcon} {...rest}>
			{label}
		</MaterialButton>
	);
};

export default Button;
