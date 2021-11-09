import { FC } from "react";
import { Box } from "@material-ui/core";

import { useStyles } from "./TabPanel.styles";

interface TabPanelProps {
	value: number;
	index: number;
	children: JSX.Element[] | JSX.Element | string;
}

const TabPanel: FC<TabPanelProps> = ({ value, index, children }) => {
	const styles = useStyles();

	if (value !== index) {
		return <></>;
	}

	return <Box className={styles.tabPanel}>{children}</Box>;
};

export default TabPanel;
