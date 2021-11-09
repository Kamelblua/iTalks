import { FC, cloneElement } from "react";

import { IconProps } from "./Icon.d";
import { useStyles } from "./Icon.styles";

const Icon: FC<IconProps> = ({ active, icon }) => {
	const styles = useStyles();

	return cloneElement(icon, { className: `${styles.icon} ${active ? styles.active : null}` });
};

export default Icon;
