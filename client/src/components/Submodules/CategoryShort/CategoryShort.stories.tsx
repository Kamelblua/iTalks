import { Story } from "@storybook/react";

import CategoryShort, { CategoryProps } from "./CategoryShort";

export default {
	component: CategoryShort,
	title: "Submodules/Category",
};

const Template: Story<CategoryProps> = (args) => <CategoryShort {...args} />;

export const Default = Template.bind({});
Default.args = {
	category: {
		id: 9,
		name: "Un super post",
		description:
			"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
		color: "#D3D1C2",
		post_count: 531,
		status: "actif",
		created_at: "2021-01-02T23:35:26.000000Z",
		updated_at: "2021-01-02T23:35:26.000000Z",
	},
};
