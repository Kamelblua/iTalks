import "../src/assets/styles/reset.css";
import "../src/assets/styles/fonts.css";
import "../src/assets/styles/main.css";

import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

import { muiTheme } from "storybook-addon-material-ui";

export const decorators = [muiTheme()];

import { configure, addDecorator } from "@storybook/react";
import StoryRouter from "storybook-react-router";

addDecorator(StoryRouter());
