import { Category } from "api/types/category";
import { Header, Property, Action } from "api/types/shared";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

class CategoryData {
	[x: string]: any;

	create(category: Category) {}
	update(category: Category) {}
	delete(category: Category) {}

	headers: Header[] = [
		{ value: "Name" },
		{ value: "Nombre de post" },
		{ value: "Date de création" },
		{ value: "Couleur" },
		{ value: "Couleur de texte" },
		{ value: "Actions", align: "center" },
	];

	properties: Property[] = [
		{ value: "name" },
		{ value: "post_count" },
		{ value: "created_at" },
		{ value: "color" },
		{ value: "text_color" },
	];

	actions: Action[] = [
		{ element: <HiPencilAlt color='var(--light)' />, action: this.update },
		{ element: <HiOutlineTrash color='var(--danger)' />, action: this.delete },
	];
}

export default new CategoryData();
