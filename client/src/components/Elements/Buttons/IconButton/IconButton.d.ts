import { ReactElement } from "react";

export enum IconButtonTypeEnum {
	Purple = "purple",
	Info = "info",
	Success = "success",
	Warning = "warning",
	Danger = "danger",
	Ghost = "transparent",
}

export type IconButtonSizeType = {
	sm: string;
	md: string;
	lg: string;
};

export enum IconButtonSizeEnum {
	Sm = "sm",
	Md = "md",
	Lg = "lg",
}

export interface IconButtonProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
	icon: ReactElement;
	[x: string]: any;
}

export interface IconButtonStylesProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
}
