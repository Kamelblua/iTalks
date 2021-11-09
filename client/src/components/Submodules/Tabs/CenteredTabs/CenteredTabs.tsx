import { FC } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";

import { useStyles } from "./CenteredTabs.styles";
import { CenteredTabsProps, tabHeader } from "./CenteredTabs.d";
import TabPanel from "../TabPanel/TabPanel";

const CenteredTabs: FC<CenteredTabsProps> = ({ currentTab, tabHeaders, tabPanels, light, handleChange, ...rest }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container} {...rest}>
			<Tabs
				TabIndicatorProps={{ style: { background: tabHeaders[currentTab].color } }}
				value={currentTab}
				onChange={handleChange}
				indicatorColor='primary'
			>
				{tabHeaders.map((tabHeader: tabHeader, i) => (
					<Tab
						style={{
							color: currentTab === i ? tabHeader.color : light ? "var(--bg)" : "var(--text)",
						}}
						className={styles.tab}
						label={tabHeader.title}
						icon={tabHeader.icon}
						key={i}
						value={i}
					/>
				))}
			</Tabs>
			{tabPanels.map((tabPanel: JSX.Element | string, i) => (
				<TabPanel key={i} value={currentTab} index={i}>
					{tabPanel}
				</TabPanel>
			))}
		</Box>
	);
};

export default CenteredTabs;
