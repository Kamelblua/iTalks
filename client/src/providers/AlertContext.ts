import { createContext } from "react";

export enum AlertContextVariantEnum {
	Info = "info",
	Success = "success",
	Warning = "warning",
	Error = "error",
}

export type AlertContextProps = {
	alert: { message: string; variant: AlertContextVariantEnum; shouldDisplay: boolean };
	setAlert: Function;
};

const DEFAULT_CONTEXT = {
	message: "Info",
	variant: AlertContextVariantEnum.Info,
	shouldDisplay: false,
};

export const AlertContext = createContext<AlertContextProps>({ alert: DEFAULT_CONTEXT, setAlert: () => {} });
