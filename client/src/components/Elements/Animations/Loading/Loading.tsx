import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { FC } from "react";

import { useStyles } from "./Loading.styles";

export interface LoadingProps {
	color?: string;
	radius?: number;
}

const Loading: FC<LoadingProps> = ({ color, radius }) => {
	const styles = useStyles({ color, radius });

	return (
		<Flex direction={FlexDirectionEnum.Horizontal}>
			<span className={`${styles.dot} ${styles.first}`}></span>
			<span className={`${styles.dot} ${styles.second}`}></span>
			<span className={`${styles.dot} ${styles.third}`}></span>
		</Flex>
	);
};

export default Loading;
