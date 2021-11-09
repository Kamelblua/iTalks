// React
import { FC } from "react";
// Librairies
import { Typography } from "@material-ui/core";
// Types
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./IconWithText.styles";
// Components
import Flex from "components/Elements/Layout/Flex/Flex";

export interface IconWithTextProps {
	icon: JSX.Element;
	label: string;
	start: boolean;
	textColor?: string;
	size?: string;
	[x: string]: any;
}

const IconWithText: FC<IconWithTextProps> = ({ size, icon, label, start, textColor, ...rest }) => {
	const styles = useStyles({ size, textColor });

	return (
		<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center} {...rest}>
			{start && icon}
			<Typography
				className={styles.label}
				style={{ marginLeft: start ? "5px" : "0px", marginRight: start ? "0px" : "5px" }}
			>
				{label}
			</Typography>
			{!start && icon}
		</Flex>
	);
};

export default IconWithText;
