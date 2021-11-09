import { AxiosInstance } from "axios";
import { ApiResult } from "api/types/api";
import { StatResult } from "api/types/stat";

class StatRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async all(): Promise<ApiResult<StatResult>> {
		return this.instance.get("/admin/stats");
	}
}

export default StatRequest;
