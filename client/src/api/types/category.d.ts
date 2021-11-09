declare type Category = {
	id: number;
	name: string;
	description: string;
	color: string;
	post_count: number;
	status: string;
	created_at: string;
	updated_at: string;
};

declare type CategoryShort = {
	id: number;
	name: string;
	color: string;
	text_color: string;
};

export { Category, CategoryShort };
