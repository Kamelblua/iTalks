import { ListDataResponse } from "./api";
import { Category } from "./category";
import { Resource } from "./resource";
import { UserShort } from "./user";

declare type Post = {
	id: number;
	title: string;
	text: string;
	is_edited: boolean;
	created_at: string;
	updated_at: string;
	feedback: boolean | null;
	status: string;
	user: UserShort;
	categories: CategoryShort[];
	vote_count: number;
	comment_count: number;
	saved: boolean;
	assiociated_resources?: Resource[];
};

declare type PostCreate = {
	title: string;
	text?: string;
	assiociated_resources?: File[];
};

declare type PostUpdate = {
	id: number;
	title: string;
	text?: string;
	status?: string;
	assiociated_resources?: File[];
};

declare type SearchResult = {
	posts: ListDataResponse<Post>;
	users: ListDataResponse<UserShort>;
	categories: ListDataResponse<Category>;
};

export { Post, PostCreate, PostUpdate, SearchResult };
