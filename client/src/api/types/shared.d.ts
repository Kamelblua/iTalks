type Property = {
	value: string;
	align?: "left" | "center" | "right" | "justify" | "inherit";
};

type Header = {
	value: string;
	align?: "left" | "center" | "right" | "justify" | "inherit";
};

type Action = {
	element: JSX.Element;
	action: Function;
};

export { Property, Header, Action };
