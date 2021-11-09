import { Story } from "@storybook/react";

import CenteredTabs from "./CenteredTabs";
import { CenteredTabsProps } from "./CenteredTabs.d";

import { HiTrendingUp, HiLightBulb } from "react-icons/hi";
import { MdNewReleases } from "react-icons/md";

export default {
	component: CenteredTabs,
	title: "Submodules/Tabs/CenteredTabs",
};

const Template: Story<CenteredTabsProps> = (args) => <CenteredTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
	activeTab: 1,
	tabHeaders: [
		{ title: "Récent", color: "var(--info)" },
		{ title: "Populaire", color: "var(--warning)" },
		{ title: "Publier", color: "var(--success)" },
	],
	tabPanels: ["Récent", "Populaire", "Publier"],
	light: true,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
	activeTab: 0,
	tabHeaders: [
		{ title: "Récent", icon: <MdNewReleases fontSize='24px' />, color: "var(--info)" },
		{ title: "Populaire", icon: <HiTrendingUp fontSize='24px' />, color: "var(--warning)" },
		{ title: "Publier", icon: <HiLightBulb fontSize='24px' />, color: "var(--success)" },
	],
	tabPanels: ["Récent", "Populaire", "Publier"],
	light: true,
};
