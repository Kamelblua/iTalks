declare type Message = {
	id: number;
	message: string;
	sender: {
		id: number;
		username: string;
	};
	status: string;
	created_at: string;
	updated_at: string;
};

export { Message };
