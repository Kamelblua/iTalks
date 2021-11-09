import axios, { AxiosInstance } from "axios";
import UserRequest from "api/modules/user.requests";
import PostRequest from "api/modules/post.request";
import CategoryRequest from "api/modules/category.requests";
import auth from "api/auth";
import MessageRequest from "./modules/message.requests";
import CommentRequest from "./modules/comment.requests";
import StatRequest from "./modules/stat.requests";
import AdminRequest from "./modules/admin.requests";

class Api {
	public url: string;
	private instance: AxiosInstance;

	public user: UserRequest;
	public post: PostRequest;
	public category: CategoryRequest;
	public message: MessageRequest;
	public comment: CommentRequest;
	public stat: StatRequest;
	public admin: AdminRequest;

	constructor() {
		this.url = auth.base_url;
		this.instance = axios.create({
			baseURL: this.url,
			headers: {
				Authorization: `Basic ${auth.token}`,
			},
			withCredentials: true,
		});
		this.user = new UserRequest(this.instance);
		this.post = new PostRequest(this.instance);
		this.category = new CategoryRequest(this.instance);
		this.message = new MessageRequest(this.instance);
		this.comment = new CommentRequest(this.instance);
		this.stat = new StatRequest(this.instance);
		this.admin = new AdminRequest(this.instance);
	}
}

const api = new Api();

export { api };
