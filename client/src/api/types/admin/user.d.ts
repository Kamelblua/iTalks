import { Badge } from "../badge";

declare type UserAdmin = {
	id: number;
	username: string;
	email: string;
	created_at: string;
	updated_at: string;
	role: string;
	avatar: string;
	status: string;
	badges: Badge[];
};

declare type UserAdminCreate = {
	username: string;
	email: string;
	role: string;
	status: string;
	avatar?: string;
	badges: Badge[];
};

declare type UserAdminUpdate = {
	id: number;
	username?: string;
	email?: string;
	role?: string;
	status?: string;
	avatar?: string;
	badges?: Badge[];
};

export { UserAdmin, UserAdminCreate, UserAdminUpdate };
