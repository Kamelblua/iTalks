import { FC, cloneElement } from "react";

import { IconButton as MaterialIconButton } from "@material-ui/core";

import { IconButtonProps } from "./IconButton.d";
import { useStyles } from "./IconButton.styles";

const IconButton: FC<IconButtonProps> = ({ type, size, light, icon, ...rest }) => {
	const styles = useStyles({ type, size, light });

	return (
		<MaterialIconButton className={styles.default} {...rest}>
			{cloneElement(icon, { className: styles.icon })}
		</MaterialIconButton>
	);
};

export default IconButton;
