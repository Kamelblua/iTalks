import { Story } from "@storybook/react";
import Button from "./Button";
import { ButtonProps, ButtonSizeEnum, ButtonTypeEnum } from "./Button.d";

import { HiLogin } from "react-icons/hi";

export default {
	component: Button,
	title: "Elements/Buttons/Button",
	argTypes: {
		fullWidth: {
			name: "fullWidth",
			type: {
				name: "boolean",
			},
		},
	},
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Button",
	type: ButtonTypeEnum.Success,
	size: ButtonSizeEnum.Sm,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	label: "Retour",
	type: ButtonTypeEnum.Info,
	startIcon: <HiLogin />,
};
