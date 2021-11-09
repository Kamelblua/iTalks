import { Badge } from "./badge";
import { Resource } from "./resource";

declare type UserProfil = {
	id: number;
	username: string;
	email: string;
	created_at: string;
	updated_at: string;
	role: string;
	avatar: string;
	status: string;
	following?: boolean;
	badges: Badge[];
};

declare type User = {
	id: number;
	username: string;
	created_at: string;
	updated_at: string;
	role: string;
	avatar: Resource;
};

declare type UserCreate = {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
};

declare type UserLogin = {
	type: string;
	identifier: string;
	password: string;
};

declare type UserUpdate = {
	id: number;
	username: string;
	avatar?: File;
	email: string;
	password: string;
};

declare type UserShort = {
	id: number;
	username: string;
	role: string;
	avatar: string;
};

export { UserProfil, User, UserLogin, UserCreate, UserUpdate, UserShort };

// DataTable
