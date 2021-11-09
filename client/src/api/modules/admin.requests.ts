import { AxiosInstance } from "axios";
import { ApiListDataResult, Search } from "api/types/api";
import { Category } from "api/types/category";
import { Post } from "api/types/post";
import { User } from "api/types/user";
import { Badge } from "api/types/badge";
import { Status } from "api/types/status";
import { Role } from "api/types/role";

interface Request {
	[key: string]: any;
}

class AdminRequest implements Request {
	instance: AxiosInstance;
	[x: string]: any;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async users(options: Search): Promise<ApiListDataResult<User>> {
		return this.instance.get("/admin/users", { params: options });
	}

	async posts(options: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get("/admin/posts", { params: options });
	}

	async categories(options: Search): Promise<ApiListDataResult<Category>> {
		return this.instance.get("/admin/categories", { params: options });
	}

	async badges(options: Search): Promise<ApiListDataResult<Badge>> {
		return this.instance.get("/admin/badges", { params: options });
	}

	async statuses(options: Search): Promise<ApiListDataResult<Status>> {
		return this.instance.get("/admin/statuses", { params: options });
	}

	async roles(options: Search): Promise<ApiListDataResult<Role>> {
		return this.instance.get("/admin/roles", { params: options });
	}
}

export default AdminRequest;
