// React
import { FC, ReactElement } from "react";
// Material ui
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./TopContainer.styles";

declare interface TopContainerProps {
	sidebar?: ReactElement;
	page: ReactElement;
	sideMargin?: number;
}

const TopContainer: FC<TopContainerProps> = ({ sidebar, page, sideMargin }) => {
	// Styles
	const styles = useStyles();

	const margin = sideMargin ? "50px " + sideMargin + "px 150px " + sideMargin + "px" : "50px 50px 150px 50px";
	return (
		<Flex direction={FlexDirectionEnum.Horizontal} fullWidth height='100%'>
			{sidebar}
			<Flex direction={FlexDirectionEnum.Vertical} className={styles.pageContainer} p={margin}>
				{page}
			</Flex>
		</Flex>
	);
};

export default TopContainer;
