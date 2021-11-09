import { AxiosInstance, AxiosResponse } from "axios";
import { ApiListDataResult, Search, SingleDataResponse, ApiMessageResult } from "api/types/api";
import { Post, PostCreate, PostUpdate, SearchResult } from "api/types/post";

class PostRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async get(id: number): Promise<SingleDataResponse<Post>> {
		return this.instance.get(`/post/${id}`);
	}

	async profilPosts(userId: number, options: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get(`profil/${userId}/posts`, { params: options });
	}

	async profilComments(userId: number, options: Search): Promise<ApiListDataResult<Comment>> {
		return this.instance.get(`profil/${userId}/comments`, { params: options });
	}

	async feed(options: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get("/posts/feed", { params: options });
	}

	async saved(options: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get("/posts/saved", { params: options });
	}

	async search(search: Search): Promise<AxiosResponse<SearchResult>> {
		return this.instance.post("/posts/search", search);
	}

	async create(post: PostCreate): Promise<ApiMessageResult> {
		return this.instance.post("/posts", post);
	}

	async createSingleImage(post: PostCreate): Promise<ApiMessageResult> {
		return this.instance.post("/posts/image", post);
	}

	async createVideo(post: PostCreate): Promise<ApiMessageResult> {
		return this.instance.post("/posts/video", post);
	}

	async createMultipleImage(post: PostCreate): Promise<ApiMessageResult> {
		return this.instance.post("/posts/multipleImage", post);
	}

	async update(post: PostUpdate): Promise<ApiMessageResult> {
		return this.instance.put(`/post/${post.id}`, post);
	}

	async save(id: number): Promise<ApiMessageResult> {
		return this.instance.get(`/post/${id}/save`);
	}

	async unsave(id: number): Promise<ApiMessageResult> {
		return this.instance.get(`/post/${id}/unsave`);
	}

	async delete(id: number): Promise<ApiMessageResult> {
		return this.instance.delete(`/post/${id}`);
	}
}

export default PostRequest;
