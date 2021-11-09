import { UserShort } from "./user";

declare type Comment = {
	id: number;
	status: string;
	text: string;
	is_edited: boolean;
	user: UserShort;
	created_at: string;
	updated_at: string;
	children_comment_count: number;
	vote_count: number;
};

export { Comment };
