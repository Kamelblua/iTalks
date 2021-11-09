import { Post, PostCreate } from "api/types/post";
import { Header, Property, Action } from "api/types/shared";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

class PostData {
	[x: string]: any;

	create(post: PostCreate) {}
	update(post: Post) {}
	delete(post: Post) {}

	headers: Header[] = [
		{ value: "Titre" },
		{ value: "Date de création" },
		{ value: "Utilisateur" },
		{ value: "Actions", align: "center" },
	];

	properties: Property[] = [{ value: "title" }, { value: "created_at" }, { value: "user.username" }];

	actions: Action[] = [
		{ element: <HiPencilAlt color='var(--light)' />, action: this.update },
		{ element: <HiOutlineTrash color='var(--danger)' />, action: this.delete },
	];
}

export default new PostData();
