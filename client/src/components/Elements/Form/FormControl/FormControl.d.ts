export interface FormControlProps {
	label: string;
	identifier: string;
	type: string;
	defaultValue?: any;
	register?: any;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	fullWidth?: boolean;
	[x: string]: any;
}
