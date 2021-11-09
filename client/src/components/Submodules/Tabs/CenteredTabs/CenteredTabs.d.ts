export type tabHeader = {
	title: string;
	icon?: JSX.Element;
	color?: string;
};

export interface CenteredTabsProps {
	currentTab: number;
	tabHeaders: tabHeader[];
	tabPanels: Array<JSX.Element | string>;
	handleChange: (event: ChangeEvent<{}>, value: any) => void;
	light?: boolean;
	[x: string]: any;
}
