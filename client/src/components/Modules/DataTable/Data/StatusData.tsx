import { Status } from "api/types/status";
import { Header, Property, Action } from "api/types/shared";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

class StatusData {
	[x: string]: any;

	create(status: Status) {}
	update(status: Status) {}
	delete(status: Status) {}

	headers: Header[] = [{ value: "Name" }, { value: "Date de création" }, { value: "Actions", align: "center" }];

	properties: Property[] = [{ value: "name" }, { value: "created_at" }];

	actions: Action[] = [
		{ element: <HiPencilAlt color='var(--light)' />, action: this.update },
		{ element: <HiOutlineTrash color='var(--danger)' />, action: this.delete },
	];
}

export default new StatusData();
