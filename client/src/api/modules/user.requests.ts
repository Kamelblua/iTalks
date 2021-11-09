import { AxiosInstance, AxiosResponse } from "axios";
import { ApiListDataResult, Search, SingleDataResponse, ApiMessageResult } from "api/types/api";
import { UserCreate, UserLogin, UserProfil, UserShort, UserUpdate } from "api/types/user";

class UserRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async verify(token: string): Promise<ApiMessageResult> {
		return this.instance.get(`/verify_email/${token}`);
	}

	async login(user: UserLogin): Promise<ApiMessageResult> {
		return this.instance.post("/login", user);
	}

	async register(user: UserCreate): Promise<ApiMessageResult> {
		return this.instance.post("/register", user);
	}

	async logout(): Promise<ApiMessageResult> {
		return this.instance.get("/logout");
	}

	async get(id: number): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/${id}`);
	}

	async profil(): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/`);
	}

	async followers(id: number, options: Search): Promise<ApiListDataResult<UserShort>> {
		return this.instance.get(`/followers/${id}`, { params: options });
	}

	async followings(id: number): Promise<ApiListDataResult<UserShort>> {
		return this.instance.get(`/followings/${id}`);
	}

	async follow(options: { id: number; type: string }): Promise<AxiosResponse<String>> {
		return this.instance.get(`follow/${options.id}`, { params: { type: options.type } });
	}

	async unfollow(options: { id: number; type: string }): Promise<AxiosResponse<String>> {
		return this.instance.get(`unfollow/${options.id}`, { params: { type: options.type } });
	}

	async search(search: Search): Promise<ApiListDataResult<UserShort>> {
		return this.instance.post("/users/search", search);
	}

	async update(user: UserUpdate): Promise<ApiMessageResult> {
		return this.instance.put("/users", user);
	}

	async delete(id: number): Promise<ApiMessageResult> {
		return this.instance.delete(`/user/${id}`);
	}
}

export default UserRequest;
