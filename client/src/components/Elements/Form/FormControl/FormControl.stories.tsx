import { FormControlProps } from "./FormControl.d";
import { Story } from "@storybook/react";
import { IconButton } from "@material-ui/core";

import FormControl from "./FormControl";
import { HiAtSymbol, HiEye } from "react-icons/hi";

export default {
	component: FormControl,
	title: "Elements/Form/FormControl",
};

let showPassword = false;
const changePasswordVisibility = () => {
	showPassword = !showPassword;
};
const Template: Story<FormControlProps> = (args) => <FormControl {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Nom d'utilisateur",
	type: "text",
	identifier: "username",
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
	label: "Adresse mail",
	type: "email",
	identifier: "email",
	startIcon: <HiAtSymbol />,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
	label: "Mot de passe",
	type: "password",
	identifier: "password",
	endIcon: (
		<IconButton>
			<HiEye />
		</IconButton>
	),
};
