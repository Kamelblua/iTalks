import { Story } from "@storybook/react";
import Loading, { LoadingProps } from "./Loading";

export default {
	component: Loading,
	title: "Elements/Animations/Loading",
};

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
	color: "var(--purple)",
};
