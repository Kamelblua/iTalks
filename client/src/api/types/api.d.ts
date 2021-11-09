import { AxiosResponse } from "axios";

type SingleDataResponse<T> = {
	data: T;
};

type Error = {
	[x: string]: any;
};

type MessageResponse = {
	message: string;
};

type ServiceResponse<T> = T;

type ListDataResponse<T> = {
	count: number;
	total: number;
	items: T[];
};

type Search = {
	page: number;
	limit: number;
	search?: string;
};

type ApiResult<T> = AxiosResponse<ServiceResponse<T>>;
type ApiMessageResult = AxiosResponse<MessageResponse>;
type ApiArrayDataResult<T> = AxiosResponse<T[]>;
type ApiListDataResult<T> = AxiosResponse<ListDataResponse<T>>;

export {
	ServiceResponse,
	SingleDataResponse,
	ApiResult,
	ApiMessageResult,
	ApiArrayDataResult,
	ApiListDataResult,
	Search,
	ListDataResponse,
};
