import { ReactNode } from "react";

export enum FlexDirectionEnum {
	Horizontal = "horizontal",
	Vertical = "vertical",
}

export enum FlexJustifyEnum {
	Center = "center",
	Start = "start",
	End = "end",
	SpaceBetween = "space-between",
	SpaceAround = "space-around",
	SpaceEvenly = "space-evenly",
}

export enum FlexAlignEnum {
	Start = "start",
	Center = "center",
	End = "end",
}

export interface FlexProps {
	direction: FlexDirectionEnum;
	children: ReactNode | ReactNode[] | string;
	justify?: FlexJustifyEnum;
	align?: FlexAlignEnum;
	centered?: boolean;
	fullWidth?: boolean;
	width?: string;
	[x: string]: any;
}
