import { Story } from "@storybook/react";

import VoteCount, { VoteCountProps } from "./VoteCount";

export default {
	component: VoteCount,
	title: "Submodules/VoteCount",
};

const Template: Story<VoteCountProps> = (args) => <VoteCount {...args} />;

export const Default = Template.bind({});
Default.args = {
	positive: null,
	votes: 15,
};

export const Positive = Template.bind({});
Positive.args = {
	positive: true,
	votes: 3540,
};

export const Negative = Template.bind({});
Negative.args = {
	positive: false,
	votes: 216,
};
