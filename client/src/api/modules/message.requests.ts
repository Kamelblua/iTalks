import { AxiosInstance } from "axios";
import { ApiListDataResult, SingleDataResponse } from "api/types/api";
import { Message } from "api/types/message";
import { UserShort } from "api/types/user";

class MessageRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async all(): Promise<ApiListDataResult<UserShort>> {
		return this.instance.get("/messages");
	}

	async get(id: number): Promise<ApiListDataResult<Message>> {
		return this.instance.get(`/messages/${id}`);
	}

	async messageTo(id: number, message: string): Promise<SingleDataResponse<Message>> {
		return this.instance.post(`/message/send/${id}`, { message: message });
	}
}

export default MessageRequest;
