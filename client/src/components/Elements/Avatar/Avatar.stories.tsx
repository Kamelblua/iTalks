import { Story } from "@storybook/react";
import Avatar, { AvatarProps } from "./Avatar";

export default {
	component: Avatar,
	title: "Elements/Animations/Loading",
};

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
	username: "AClain",
	link: "https://material-ui.com/static/images/avatar/1.jpg",
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
	username: "AClain",
};

export const WithCustomSize = Template.bind({});
WithCustomSize.args = {
	username: "AClain",
	size: 75,
};
