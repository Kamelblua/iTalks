import { Story } from "@storybook/react";
import PostShort, { PostProps } from "./PostShort";

export default {
	component: PostShort,
	title: "Submodules/Post",
};

const Template: Story<PostProps> = (args) => <PostShort {...args} />;

export const Default = Template.bind({});
Default.args = {
	post: {
		created_at: "2021-01-02T23:35:26.000000Z",
		updated_at: "2021-01-02T23:35:26.000000Z",
		is_edited: false,
		comment_count: 531,
		status: "actif",
		id: 9,
		text:
			"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
		title: "Un super post",
		user: {
			id: 1,
			username: "user45978",
			role: "admin",
			avatar:
				"https://images.unsplash.com/photo-1629105467735-5eb0a87f67f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
		},
		vote_count: 3694,
		feedback: true,
		categories: [
			{
				id: 1,
				name: "Non catégorisé",
			},
		],
		saved: true,
	},
};

export const Positive = Template.bind({});
Positive.args = {
	post: {
		created_at: "2021-07-02T23:35:26.000000Z",
		updated_at: "2021-07-02T23:35:26.000000Z",
		is_edited: false,
		comment_count: 5,
		status: "actif",
		id: 9,
		text:
			"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
		title: "Un super post",
		user: {
			id: 1,
			username: "user45978",
			role: "admin",
			avatar:
				"https://images.unsplash.com/photo-1629105467735-5eb0a87f67f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
		},
		vote_count: 16,
		feedback: true,
		categories: [
			{
				id: 1,
				name: "Non catégorisé",
			},
		],
		saved: true,
	},
};

export const Negative = Template.bind({});
Negative.args = {
	post: {
		created_at: "2021-06-28T23:35:26.000000Z",
		updated_at: "2021-06-28T23:35:26.000000Z",
		is_edited: false,
		comment_count: 34,
		status: "actif",
		id: 9,
		text:
			"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
		title: "Un super post",
		user: {
			id: 1,
			username: "user45978",
			role: "admin",
			avatar:
				"https://images.unsplash.com/photo-1629105467735-5eb0a87f67f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
		},
		vote_count: 124,
		feedback: false,
		categories: [
			{
				id: 1,
				name: "Non catégorisé",
			},
		],
		saved: false,
	},
};

export const WithImage = Template.bind({});
WithImage.args = {
	post: {
		assiociated_resources: [
			{
				id: 1,
				link:
					"https://images.unsplash.com/photo-1591488320449-011701bb6704?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
				name: "image.png",
				created_at: "2021-06-28T23:35:26.000000Z",
				updated_at: "2021-06-28T23:35:26.000000Z",
				status: "actif",
			},
		],
		created_at: "2021-06-28T23:35:26.000000Z",
		updated_at: "2021-06-28T23:35:26.000000Z",
		is_edited: false,
		comment_count: 5,
		status: "actif",
		id: 9,
		text:
			"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
		title: "Un super post",
		user: {
			id: 1,
			username: "user45978",
			role: "admin",
			avatar:
				"https://images.unsplash.com/photo-1629105467735-5eb0a87f67f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
		},
		vote_count: 350,
		feedback: null,
		categories: [
			{
				id: 1,
				name: "Non catégorisé",
			},
		],
		saved: true,
	},
};
